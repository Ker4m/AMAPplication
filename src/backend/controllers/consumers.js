const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const consumersModel = require('../models/consumers')
const contractsModel = require('../models/contracts')
const usersModel = require('../models/users')
const has = require('has-keys')
const proposalsModel = require('../models/proprosals')
const activesModel = require('../models/actives')
const {Op} = require('sequelize')
const moment = require('moment')

module.exports = {
    async getConsumers(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'Get All consumers'
        let data = []

        const usersList = await usersModel.findAll()

        for (const userData of usersList) {
            const {userId} = userData
            const consumerData = await consumersModel.findOne({where: {consumerId: userId}})
            if (consumerData && userData) {
                data.push({...userData['dataValues'], ...consumerData['dataValues']})
            } // Merge data from users model and data from consumers model
        }

        res.json({
            status: true,
            message: 'Returning consumers',
            data: data
        })
    },
    async getConsumersById(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'Get consumer by ID'
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
        const {id} = req.params
        const consumerData = await consumersModel.findOne({where: {consumerId: id}})
        if (!consumerData) throw new CodeError('Consumer not found', status.BAD_REQUEST)
        const userData = await usersModel.findOne({where: {userId: id}})
        res.json({
            status: true,
            message: 'Returning consumer\'s information',
            data: {...userData['dataValues'], ...consumerData['dataValues']}
        })
    },
    async getAllContractsByConsumerId(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Get All Contracts For the Consumer Thanks To His Id'
        let {id} = req.params
        let data = []
        let contractsData = await contractsModel.findAll({where: {contractConsumerId: id}})
        for (const contract of contractsData) {
            const {contractProducerId} = contract
            const producerData = await usersModel.findOne({where: {userId: contractProducerId}})
            data.push({...contract['dataValues'], ...producerData['dataValues']})
        }
        res.json({
            status: true,
            message: 'Returning All Contracts of Consumer',
            data
        })
    },
    async verifyContract(req, res, next) {
        let {id} = req.params
        let contractsData = await contractsModel.findAll({where: {contractConsumerId: id}})
        if (contractsData) {
            await contractsModel.update({status: 3}, {where: {status: 1, expirationDate: {[Op.lt]: moment().toDate()}}})
            for (let cont of contractsData) {
                let {duration, beginningProposal} = await proposalsModel.findOne({where: {proposalId: cont.proposalId}})
                if (moment().format('YYYY-MM-DD') > moment(beginningProposal).add(duration, 'weeks').format('YYYY-MM-DD')) {
                    await contractsModel.update({status: 2}, {where: {contractId: cont.contractId, status: 0}})
                }
            }
        }
        next()
    }
    ,
    async getContractByIds(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Get Contract by IDs'
        let {id, cid} = req.params
        const contractData = await contractsModel.findOne({where: {contractConsumerId: id, contractId: cid}})
        res.json({
            status: true,
            message: 'Returning Contract',
            data: contractData
        })
    }
    ,
    async newConsumer(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'New Consumer'
        // #swagger.parameters['data'] = { in: 'body', description:'First Name, Name, address and email', schema: { $firstName: 'Doe', $name: 'John', $address: '7 rue bidon, 38000 GRENOBLE', $email: 'John.Doe@acme.com', $permDates: '2022-01-17', $active: true}}
        if (!has(req.body, ['firstName', 'name', 'address', 'email'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
        const {
            firstName,
            name,
            address,
            email,
            permDates,
            active,
        } = req.body
        const userData = await usersModel.findOne({where: {firstName, name, address, email}})
        const {userId} = userData
        const isConsumer = await consumersModel.findOne({where: {consumerId: userId}})
        if (isConsumer) throw new CodeError('Consumer already exists', status.BAD_REQUEST)
        await consumersModel.create({
            consumerId: userId,
            permDates,
            active
        })
        res.statusCode = status.CREATED
        res.json({
            status: true,
            message: 'Consumer Added'
        })
    },
    async newContract(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'New Contract'
        // #swagger.parameters['data'] = { in: 'body', description:'Quantity and unit', schema: { $quantityForConsumer: 5, $unitForConsumer: 'kg'}}
        if (!has(req.body, ['quantityForConsumer', 'unitForConsumer'])) throw new CodeError('You must specify a quantity, a unit, a beginning date', status.BAD_REQUEST)
        const {
            quantityForConsumer,
            unitForConsumer,
        } = req.body
        const {id, pid} = req.params
        const {
            proposalProducerId,
            quantity,
            duration,
            product,
        } = await proposalsModel.findOne({where: {proposalId: pid}})
        if (quantity < quantityForConsumer) throw new CodeError('You are asking a quantity higher than the proposal', status.BAD_REQUEST)
        await contractsModel.create({
            quantityForConsumer,
            unitForConsumer,
            contractProduct: product,
            durationContract: duration,
            contractConsumerId: id,
            proposalId: pid,
            contractProducerId: proposalProducerId,
            status: 0
        })
        res.json({
            status: true,
            message: 'Contract Created'
        })
    }
    ,
    async modifyConsumerById(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'Modify by ID'
        // #swagger.parameters['data'] = { in: 'body', description:'First Name, Name, address', schema: { $firstName: 'Doe', $name: 'John', $address: '7 rue bidon, 38000 GRENOBLE'}}
        if (!has(req.body, ['firstName', 'name', 'address'])) throw new CodeError('You must specify a firstName, name and address', status.BAD_REQUEST)
        const {
            firstName,
            name,
            address
        } = req.body
        const {id} = req.params
        await usersModel.update({firstName: firstName, name: name, address: address}, {where: {userId: id}})
        res.json({
            status: true,
            message: 'Consumer Modified'
        })
    },
    async setValidated(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Validate the Contract'
        // #swagger.parameters['data'] = { in: 'body', description:'Beginning Date', schema: { $beginningContract: '2022-05-02'}}
        if (!has(req.body, ['beginningContract'])) throw new CodeError('You must specify a date for beginning the contract', status.BAD_REQUEST)
        const {beginningContract} = req.body
        if (moment(beginningContract).isBefore(moment().subtract(1, 'days'))) throw new CodeError('Invalid beginning Date', status.BAD_REQUEST)
        const {id, cid} = req.params
        let {
            proposalId,
            quantityForConsumer,
            status,
            durationContract,
            contractProducerId
        } = await contractsModel.findOne({where: {contractId: cid}})
        if (parseInt(id) !== contractProducerId) throw new CodeError('Your Id Does not correspond to the producer Id of this contract', status.BAD_REQUEST)
        let expirationDate = moment(beginningContract).add(durationContract, 'weeks').format('YYYY-MM-DD')
        if (!(status === 0)) throw new CodeError('You cannot validated this contract', status.BAD_REQUEST)
        let {quantity} = await proposalsModel.findOne({where: proposalId})
        await contractsModel.update({
            status: 1,
            beginningContract: beginningContract,
            expirationDate: expirationDate
        }, {where: {contractId: cid, contractProducerId: id}})
        await proposalsModel.update({quantity: quantity - quantityForConsumer}, {where: {proposalId}})
        await contractsModel.update({status: 2}, {
            where: {
                proposalId: proposalId,
                quantityForConsumer: {[Op.gt]: quantity - quantityForConsumer},
                status: 0
            }
        })
        res.json({
            status: true,
            message: 'Contract Validated'
        })
    },
    async setConsumerAvailable(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Set Consumer To Available'
        // #swagger.parameters['data'] = { in: 'body', description:'Date', schema: { $date: '2022-05-09'}}
        const {id} = req.params
        const {date} = req.body
        const data = await activesModel.findOne({where: {consumerId: id, date}})
        if (!data) throw new CodeError('Consumer is not active', status.BAD_REQUEST)
        await activesModel.update({available: true}, {where: {consumerId: id, date}})
        res.statusCode = status.CREATED
        res.json({status: true, message: 'Consumer Set Available'})
    },
    async setConsumerPerma(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Set Consumer In Permanence'
        // #swagger.parameters['data'] = { in: 'body', description:'Date', schema: { $date: '2022-05-09'}}
        const {id} = req.params
        const {date} = req.body
        const data = await activesModel.findOne({where: {consumerId: id, date, available: true}})
        if (!data) throw new CodeError('Consumer is not available', status.BAD_REQUEST)
        const ava = await activesModel.findAll({where: {date, permanence: true}})
        if (ava.length === 2) throw new CodeError('There are already 2 consumers on this permanence', status.BAD_REQUEST)
        await activesModel.update({permanence: true}, {where: {consumerId: id, date, available: true}})
        res.statusCode = status.CREATED
        res.json({status: true, message: 'Consumer Set In Permanence'})
    },

    async setConsumerNotPerma(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Set Consumer To Not In Permanence'
        // #swagger.parameters['data'] = { in: 'body', description:'Date', schema: { $date: '2022-05-09'}}
        const {id} = req.params
        const {date} = req.body
        const data = await activesModel.findOne({where: {consumerId: id, date, available: true}})
        if (!data) throw new CodeError('Consumer is not active and available', status.BAD_REQUEST)
        await activesModel.update({permanence: false}, {where: {consumerId: id, date: date}})
        res.json({status: true, message: 'Consumer Set Not In Permanence'})
    }
    ,
    async deleteConsumers(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'Delete All Consumers'
        await consumersModel.destroy({where: {}})
        res.json({status: true, message: 'Consumers Deleted'})
    },

    async deleteConsumerById(req, res) {
        // #swagger.tags = ['Consumers']
        // #swagger.summary = 'Delete Consumer By Id'
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
        const {id} = req.params
        await consumersModel.destroy({where: {consumerId: id}})
        res.json({status: true, message: 'Consumer Deleted'})
    },
    async deleteContractsByConsumerId(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Delete All Contracts Of a Consumer By His Id'
        const {id} = req.params
        await contractsModel.destroy({where: {contractConsumerId: id}})
        res.json({status: true, message: 'Contracts Deleted'})
    },
    async deleteContractByIds(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Delete Contract By His Id'
        const {id, cid} = req.params
        await contractsModel.destroy({where: {contractId: cid, contractConsumerId: id}})
        res.json({status: true, message: 'Contract Deleted'})
    },
    async setActives(req, res, next) {
        const now = moment()
        for (let i = 1; i < 5; i++) {
            let nextMonday = now.startOf('isoWeek').add(1, 'weeks').format('YYYY-MM-DD')
            let contractsList
            contractsList = await contractsModel.findAll({
                where: {beginningContract: {[Op.lte]: nextMonday}},
                expirationDate: {[Op.gt]: nextMonday}
            })
            for (const contract of contractsList) {
                if ((contract.beginningContract <= nextMonday && contract.expirationDate > nextMonday) && (await activesModel.findAll({
                    where: {
                        date: nextMonday,
                        consumerId: contract.contractConsumerId
                    }
                })).length === 0) await activesModel.create({date: nextMonday, consumerId: contract.contractConsumerId})
            }
        }
        next()
    },
    async setConsumerNotAvailable(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Set Consumer To Not Available'
        // #swagger.parameters['data'] = { in: 'body', description:'Date', schema: { $date: '2022-05-09'}}
        const {id} = req.params
        const {date} = req.body
        const data = await activesModel.findOne({where: {consumerId: id, date}})
        if (!data) throw new CodeError('Consumer is not active', status.BAD_REQUEST)
        await activesModel.update({available: false, perma: false}, {where: {consumerId: id, date}})
        res.json({status: true, message: 'Consumer Set Not Available'})
    },
    async getActivesConsumers(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get active consumers for 4 weeks'
        let data = []
        const now = moment()
        for (let i = 1; i < 5; i++) {
            let consList = new Set()
            let nextMonday = now.startOf('isoWeek').add(1, 'week').format('YYYY-MM-DD')
            const activesList = await activesModel.findAll({where: {date: nextMonday}})
            for (const active of activesList) {
                consList.add(await usersModel.findOne({where: {userId: active.consumerId}}))
            }
            consList = [...consList]
            data.push(consList)
        }
        res.json({
            status: true,
            message: 'Returning active consumers',
            data
        })
    },
    async getAvailableConsumers(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get available consumers for 4 weeks'
        let data = []
        const now = moment()
        for (let i = 1; i < 5; i++) {
            let consList = new Set()
            let nextMonday = now.startOf('isoWeek').add(1, 'week').format('YYYY-MM-DD')
            const activesList = await activesModel.findAll({where: {date: nextMonday, available: true}})
            for (const active of activesList) {
                consList.add(await usersModel.findOne({where: {userId: active.consumerId}}))
            }
            consList = [...consList]
            data.push(consList)
        }
        res.json({
            status: true,
            message: 'Returning available consumers',
            data
        })
    },
    async getPermaConsumers(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get permanence consumers for 4 weeks'
        let data = []
        const now = moment()
        for (let i = 1; i < 5; i++) {
            let consList = new Set()
            let nextMonday = now.startOf('isoWeek').add(1, 'week').format('YYYY-MM-DD')
            const activesList = await activesModel.findAll({
                where: {
                    date: nextMonday,
                    available: true,
                    permanence: true
                }
            })
            for (const active of activesList) {
                consList.add(await usersModel.findOne({where: {userId: active.consumerId}}))
            }
            consList = [...consList]
            data.push(consList)
        }
        res.json({
            status: true,
            message: 'Returning permanence\'s consumers',
            data
        })
    },
    async getActivesForConsumerId(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get active weeks for consumer in next 4 weeks'
        const {id} = req.params
        let data = []
        const dispo = await activesModel.findAll({where: {consumerId: id}})
        for (const elem of dispo) {
            if (!(elem.date in data)) data.push(elem.date)
        }
        res.json({
            status: true,
            message: 'Returning active dates of consumer',
            data
        })
    },
    async getAvailableForConsumerId(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get available weeks for consumer in next 4 weeks'
        const {id} = req.params
        let data = []
        const dispo = await activesModel.findAll({where: {consumerId: id, available: true}})
        for (const elem of dispo) {
            if (!(elem.date in data)) data.push(elem.date)
        }
        res.json({
            status: true,
            message: 'Returning available dates of consumer',
            data
        })
    },
    async getPermaForConsumerId(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get permanence weeks for consumer in next 4 weeks'
        const {id} = req.params
        let data = []
        const dispo = await activesModel.findAll({where: {consumerId: id, available: true, permanence: true}})
        for (const elem of dispo) {
            if (!(elem.date in data)) data.push(elem.date)
        }
        res.json({
            status: true,
            message: 'Returning permanences dates of consumer',
            data
        })
    },
    async verifyConsumerId(req, res, next) {
        let {id} = req.params
        let consumerData = await consumersModel.findOne({where: {consumerId: id}})
        if (!consumerData) throw new CodeError('Consumer not found', status.BAD_REQUEST)
        next()
    },
    async verifyContractId(req, res, next) {
        let {cid} = req.params
        let contractData = await contractsModel.findOne({where: {contractId: cid}})
        if (!contractData) throw new CodeError('Contract not found', status.BAD_REQUEST)
        next()
    }
}

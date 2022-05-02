const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const producersModel = require('../models/producers')
const usersModel = require('../models/users')
const proposalsModel = require('../models/proprosals')
const has = require('has-keys')
const moment = require('moment')
const contractsModel = require('../models/contracts')

module.exports = {
    async getProducers(req, res) {
        /* #swagger.tags = ['Producers']
         #swagger.summary = 'Get All producers'
         */
        let data = []

        const usersList = await usersModel.findAll()

        for (const userData of usersList) {
            const {userId} = userData
            const producerData = await producersModel.findOne({where: {producerId: userId}})
            if (producerData && userData) {
                data.push({...userData['dataValues'], ...producerData['dataValues']})
            } // Merge data from users model and data from producers model
        }

        res.json({
            status: true,
            message: 'Returning producers',
            data: data
        })
    },
    async getProducersById(req, res) {
        // #swagger.tags = ['Producers']
        // #swagger.summary = 'Get producer by ID'
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
        const {id} = req.params
        const producerData = await producersModel.findOne({where: {producerId: id}})
        if (!producerData) throw new CodeError('Producer not found', status.BAD_REQUEST)
        const userData = await usersModel.findOne({where: {userId: id}})
        const data = {...userData['dataValues'], ...producerData['dataValues']}
        res.json({
            status: true,
            message: 'Returning producer\'s information',
            data
        })
    },
    async modifyProducerById(req, res) {
        // #swagger.tags = ['Producers']
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
            message: 'Producer Modified'
        })
    },
    async getAllProposals(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'Get All Proposals'
        let data = []
        const proposalsData = await proposalsModel.findAll({where: {status: 0}})
        for (const proposal of proposalsData) {
            const {proposalProducerId} = proposal
            const producerData = await usersModel.findOne({where: {userId: proposalProducerId}})
            data.push({...proposal['dataValues'], ...producerData['dataValues']})
        }
        res.json({
            status: true,
            message: 'Returning All Proposals',
            data
        })
    },
    async getAllProposalsByProducerId(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'Get All Proposals For the Producer Thanks To His Id'
        let {id} = req.params
        const proposalsData = await proposalsModel.findAll({where: {proposalProducerId: id}})
        res.json({
            status: true,
            message: 'Returning All Proposals',
            data: proposalsData
        })
    },
    async getProposalOfProducerByIds(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'Get Proposal Related To Proposal Id For the Producer Thanks To His Id'
        let {id, pid} = req.params
        const proposalData = await proposalsModel.findOne({where: {proposalProducerId: id, proposalId: pid}})
        res.json({
            status: true,
            message: 'Returning All Proposals',
            data: proposalData
        })
    }
    ,
    async getContractsByProducerId(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Get All Contracts Related To the Producer Thanks To His Id'
        let {id} = req.params
        let data = []
        const contractsData = await contractsModel.findAll({where: {contractProducerId: id}})
        for (const contract of contractsData) {
            const {contractConsumerId} = contract
            const consumerData = await usersModel.findOne({where: {userId: contractConsumerId}})
            data.push({...contract['dataValues'], ...consumerData['dataValues']})
        }
        res.json({
            status: true,
            message: 'Returning All Contracts of Producer',
            data
        })
    }
    ,
    async newProducer(req, res) {
        // #swagger.tags = ['Producers']
        // #swagger.summary = 'New producer'
        // #swagger.parameters['data'] = { in: 'body', description:'First Name, Name, address and email', schema: { $firstName: 'Albert', $name: 'Lebon', $address: '8 rue Victor Hugo, 38000 GRENOBLE', $email: 'albert.lebon@gmail.com'}}
        if (!has(req.body, ['firstName', 'name', 'address', 'email'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
        const {
            firstName,
            name,
            address,
            email,
        } = req.body
        const userData = await usersModel.findOne({where: {firstName, name, address, email}})
        const {userId} = userData
        const isProducer = await producersModel.findOne({where: {producerId: userId}})
        if (isProducer) throw new CodeError('Producer already exists', status.BAD_REQUEST)
        await producersModel.create({
            producerId: userId
        })
        res.statusCode = status.CREATED
        res.json({
            status: true,
            message: 'Producer Added'
        })
    },
    async newProposalByProducerId(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'New Proposal'
        // #swagger.parameters['data'] = { in: 'body', description:'Duration, product, quantity and unit', schema: { $duration: 3, $product: 'Concombre', $quantity : 15, $unit: 'Kg', $beginningProposal: '2022-05-02'}}
        let {id} = req.params
        if (!has(req.body, ['duration', 'product', 'quantity', 'unit', 'beginningProposal'])) throw new CodeError('You must specify the duration, the product, the quantity, unit and beginningProposal', status.BAD_REQUEST)
        const {
            duration,
            product,
            quantity,
            unit,
            beginningProposal,
        } = req.body
        if (moment(beginningProposal).isBefore(moment().subtract(1,'days'))) throw new CodeError('Invalid beginning Date', status.BAD_REQUEST)
        await proposalsModel.create({
            duration,
            product,
            quantity,
            unit,
            beginningProposal,
            proposalProducerId: id,
            status: 0
        })
        res.statusCode = status.CREATED
        res.json({
            status: true,
            message: 'Proposal Created'
        })
    }
    ,
    async deleteProducers(req, res) {
        // #swagger.tags = ['Producers']
        // #swagger.summary = 'Delete All producers'
        await producersModel.destroy({where: {}})
        res.json({status: true, message: 'Producers Deleted'})
    },
    async deleteProducerById(req, res) {
        // #swagger.tags = ['Producers']
        // #swagger.summary = 'Delete Producer By Id'
        const {id} = req.params
        await producersModel.destroy({where: {producerId: id}})
        res.json({status: true, message: 'Producer Deleted'})
    },
    async deleteProposalsByProducerId(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'Delete All Proposals Of a Producer By His Id'
        const {id} = req.params
        await proposalsModel.destroy({where: {proposalProducerId: id}})
        res.json({status: true, message: 'Proposals Deleted'})
    },
    async deleteProposalOfProducerByIds(req, res) {
        // #swagger.tags = ['Proposals']
        // #swagger.summary = 'Get Proposal Related To Proposal Id For the Producer Thanks To His Id'
        let {id, pid} = req.params
        await proposalsModel.destroy({where: {proposalProducerId: id, proposalId: pid}})
        res.json({status: true, message: 'Proposals Deleted'})
    },
    async verifyProducerId(req, res, next) {
        let {id} = req.params
        let producerData = await producersModel.findOne({where: {producerId: id}})
        if (!producerData) throw new CodeError('Producer not found', status.BAD_REQUEST)
        next()
    },
    async verifyProposalId(req, res, next) {
        let {pid} = req.params
        let producerData = await proposalsModel.findOne({where: {proposalId: pid}})
        if (!producerData) throw new CodeError('Proposal not found', status.BAD_REQUEST)
        next()
    },
    async verifyProposals(req, res, next) {
        let proposalsData = await proposalsModel.findAll({where: {status: 0}})
        for (let prop of proposalsData) {
            if (moment(prop.beginningProposal).add(prop.duration, 'weeks').isBefore(moment().subtract(1,'days')) || prop.quantity === 0) {
                await proposalsModel.update({status: 1}, {where: {proposalId: prop.proposalId}})
            }
        }
        next()
    },
    async deleteContractByIds(req, res) {
        // #swagger.tags = ['Contracts']
        // #swagger.summary = 'Delete Contract By His Id'
        const {id, cid} = req.params
        await contractsModel.destroy({where: {contractId: cid, contractProducerId: id}})
        res.json({status: true, message: 'Contract Deleted'})
    }
}

const consumersModel = require('../models/consumers.js')
const producersModel = require('../models/producers.js')
const usersModel = require('../models/users.js')
const contractsModel = require('../models/contracts.js')
const proposalsModel = require('../models/proprosals.js')
const moment = require('moment')

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const day = today.getDate()

const todayMonthFormated = month > 9 ? month.toString() : '0' + month.toString()
const todayDayFormated = day > 9 ? day.toString() : '0' + day.toString() 

const dateFormated = year + '-' + todayMonthFormated + '-' + todayDayFormated

const contractStatus = {
    WAITING: 0,
    VALIDATED: 1,
    REFUSED: 2,
    EXPIRED: 3
}

async function createAdmin(firstName, name, address, email, organizer) {
    await usersModel.create({
        firstName,
        name,
        address,
        email,
        organizer
    })
    const userData = await usersModel.findOne({where: {firstName, name, address, email}})
    await consumersModel.create({
        consumerId: userData.userId
    })
    await producersModel.create({
        producerId: userData.userId
    })
}

async function createProposal(duration, product, quantity, unit, beginningProposal, proposalProducerId) {
    await proposalsModel.create({
        duration,
        product,
        quantity,
        unit,
        beginningProposal,
        proposalProducerId,
        status: 0
    })
}

async function createContract(quantityForConsumer, unitForConsumer, contractProduct, durationContract, contractConsumerId, proposalId, contractProducerId, status, beginningContract) {
    if (beginningContract) {
        await contractsModel.create({
            quantityForConsumer,
            unitForConsumer,
            contractProduct,
            durationContract,
            contractConsumerId,
            proposalId,
            contractProducerId,
            status,
            beginningContract,
            expirationDate: moment(beginningContract).add(durationContract, 'weeks').format('YYYY-MM-DD')
        })
    } else {
        await contractsModel.create({
            quantityForConsumer,
            unitForConsumer,
            contractProduct,
            durationContract,
            contractConsumerId,
            proposalId,
            contractProducerId,
            status
        })
    }
}

async function init() {
    await createAdmin('Hugo', 'Dabadie', '6 rue Brocherie, 38000 GRENOBLE', 'hugo.dabadie40@gmail.com', false)
    await createAdmin('Marek', 'Elmayan', '6 rue Brocherie, 38000 GRENOBLE', 'elmayan.marek@gmail.com', false)
    await createAdmin('Nicolas', 'Ferlut', '15 rue Antoine Polotti, 38400 SAINT MARTIN D\'HERES', 'nicolas.ferlut@gmail.com', false)
    await createAdmin('Nathan', 'Gicquel', '3 rue bayard, 38000 GRENOBLE', 'nathan.gicquel33@gmail.com', false)
    await createAdmin('Titouan', 'Lecamp', '6 rue Alexandre 1er de Yougoslavie, 38000 GRENOBLE', 'titou.lecamp@gmail.com', true)

    await createProposal(7, 'aubergines', 70, 'kg', dateFormated, 2)
    await createProposal(5, 'champignons', 10, 'cagette(s)', dateFormated, 2)
    await createProposal(21, 'choux', 450, 'unité(s)', dateFormated, 2)
    await createProposal(2, 'cerises', 21, 'kg', dateFormated, 2)

    await createProposal(4, 'aubergines', 21, 'kg', dateFormated, 5)
    await createProposal(22, 'salsifis', 7, 'cagette(s)', dateFormated, 5)
    await createProposal(17, 'patates', 450, 'kg', dateFormated, 5)
    await createProposal(9, 'fraises', 18, 'kg', dateFormated, 5)

    await createContract(17, 'kg', 'aubergines', 4, 1, 1, 2, contractStatus.VALIDATED, moment(dateFormated).subtract(2, 'weeks').format('YYYY-MM-DD'))
    await createContract(21, 'kg', 'aubergines', 5, 4, 1, 2, contractStatus.WAITING)
    await createContract(2, 'kg', 'aubergines', 3, 5, 1, 2, contractStatus.EXPIRED)

    await createContract(1, 'cagette(s)', 'champignons', 3, 5, 2, 2, contractStatus.VALIDATED,moment(dateFormated).subtract(1, 'weeks').format('YYYY-MM-DD'))

    await createContract(9, 'cagette(s)', 'salsifis', 12, 2, 6, 5, contractStatus.WAITING)
    await createContract(7, 'cagette(s)', 'salsifis', 7, 3, 6, 5, contractStatus.VALIDATED, moment(dateFormated).subtract(3, 'weeks').format('YYYY-MM-DD'))

    await createContract(70, 'kg', 'patates', 15, 1, 7, 5, contractStatus.WAITING)
}

init().then(() => console.log('Database initialised'))

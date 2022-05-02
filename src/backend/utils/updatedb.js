const dataBase = require('../models/database.js')
const consumersModel = require('../models/consumers.js')
const producersModel = require('../models/producers.js')
const usersModel = require('../models/users.js')
const contractsModel = require('../models/contracts.js')
const activesModel = require('../models/actives.js')
const proposalsModel = require('../models/proprosals.js')

async function init() {
    await dataBase.sync({force: true})
    await consumersModel.sync({force: true})
    await producersModel.sync({force: true})
    await usersModel.sync({force: true})
    await contractsModel.sync({force: true})
    await activesModel.sync({force: true})
    await contractsModel.sync({force: true})
    await proposalsModel.sync({force: true})
}

init().then(() => console.log('Database initialised'))

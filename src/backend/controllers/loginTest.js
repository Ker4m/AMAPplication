const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const consumersModel = require('../models/consumers')
const producersModel = require('../models/producers')
const has = require('has-keys')

module.exports = {
    async callGoogleAuth(req, res) {
        res.json({status: true, message: 'No token in test mode'})
    },
    async sendToken(req, res) {
        res.json({status: true, message: 'No token in test mode'})
    },
    async sendUserData(req, res) {
        res.json({
            status: true, message: 'User logged in successfully for test mode'
        })
    }, async isConsumer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id of the consumer', status.BAD_REQUEST)
        const {id} = req.params
        const consumerData = await consumersModel.findOne({where: {consumerId: id}})
        if (!consumerData) throw new CodeError('This user is not a consumer', status.FORBIDDEN)
        next()
    }, async isProducer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id of the producer', status.BAD_REQUEST)
        const {id} = req.params
        const producerData = await producersModel.findOne({where: {producerId: id}})
        if (!producerData) throw new CodeError('This user is not a producer', status.FORBIDDEN)
        next()
    }, async isOrganizer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        // No verification in test mode
        next()
    }
}

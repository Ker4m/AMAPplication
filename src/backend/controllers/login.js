const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const usersModel = require('../models/users')
const consumersModel = require('../models/consumers')
const producersModel = require('../models/producers')
const axios = require('axios')
const has = require('has-keys')
const oauth2Client = require('../utils/oauth2')

async function verifyLogin(headers) {
    if (!headers || !has(headers, 'x-access-token')) throw new CodeError('Id token missing', status.FORBIDDEN)
    const idToken = headers['x-access-token']
    const {data: userInfo} = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    const userData = await usersModel.findOne({where: {email: userInfo.email}})
    if (!userData) throw new CodeError('User not found', status.FORBIDDEN)
    return userData
}

module.exports = {
    async callGoogleAuth(req, res) {
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.email']
        })
        res.redirect(authorizeUrl)
    },
    async sendToken(req, res) {
        if (!req.query.code) throw new CodeError('Access denied by google', status.FORBIDDEN)
        const {tokens} = await oauth2Client.getToken(req.query.code)
        res.json({idToken: tokens.id_token})
    },
    async sendUserData(req, res) {
        const userData = await verifyLogin(req.headers)
        const consumerData = await consumersModel.findOne({where: {consumerId: userData.userId}})
        const producerData = await producersModel.findOne({where: {producerId: userData.userId}})
        const isConsumer = consumerData !== null
        const isProducer = producerData !== null
        const data = {
            userId: userData.userId,
            firstName: userData.firstName,
            name: userData.name,
            address: userData.address,
            email: userData.email,
            consumer: isConsumer,
            producer: isProducer,
            organizer: userData.organizer
        }
        res.json({
            status: true, message: 'User logged in successfully', data: data
        })
    }, async isConsumer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id of the consumer', status.BAD_REQUEST)
        const {id} = req.params
        const userData = await verifyLogin(req.headers)
        if (parseInt(id) !== userData.userId) throw new CodeError('The id given in params does not match with tokens info')
        const consumerData = await consumersModel.findOne({where: {consumerId: userData.userId}})
        if (!consumerData) throw new CodeError('This user is not a consumer', status.FORBIDDEN)
        next()
    }, async isProducer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        if (!has(req.params, 'id')) throw new CodeError('You must specify the id of the producer', status.BAD_REQUEST)
        const {id} = req.params
        const userData = await verifyLogin(req.headers)
        if (parseInt(id) !== userData.userId) throw new CodeError('The id given in params does not match with tokens info')
        const producerData = await producersModel.findOne({where: {producerId: userData.userId}})
        if (!producerData) throw new CodeError('This user is not a producer', status.FORBIDDEN)
        next()
    }, async isOrganizer(req, res, next) {
        // #swagger.parameters['x-access-token'] = { in: 'header'}
        const userData = await verifyLogin(req.headers)
        if (!userData.organizer) throw new CodeError('This user is not an organizer', status.FORBIDDEN)
        next()
    }
}

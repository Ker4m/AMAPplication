const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const usersModel = require('../models/users')
const has = require('has-keys')
const activesModel = require('../models/actives')

module.exports = {
    async getOrganizer(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get All Organizers'
        const organizer = await usersModel.findOne({where: {organizer: true}})
        res.json({
            status: true,
            message: 'Returning Organizer',
            data: organizer
        })
    },
    async newOrganizer(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'New Organizer'
        // #swagger.parameters['data'] = { in: 'body', description:'email', schema: {$firstName: 'Albert', $name: 'Lebon', $address:'Au Pain Bagnat', $email: 'albert.lebon@acme.com'}}
        const organizerList = await usersModel.findAll({where: {organizer: true}})
        if (organizerList.length !== 0) {
            throw new CodeError('You have to delete the previous organizer to add this one !', status.BAD_REQUEST)
        }
        if (!has(req.body, ['firstName', 'name', 'address', 'email'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
        const {
            firstName,
            name,
            address,
            email,
        } = req.body
        const userData = await usersModel.findOne({
            where: {
                email
            }
        })
        if (!userData) {
            usersModel.create({
                firstName,
                name,
                address,
                email,
                organizer: true
            })
            res.statusCode = status.CREATED
            res.json({
                status: true,
                message: 'Organizer created'
            })
        }
        res.json({
            status: false,
            message: 'Organizer Already Exists'
        })

    },
    async setNewOrganizer(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Set Organizer'
        // #swagger.parameters['data'] = { in: 'body', description:'email', schema: {$email: 'nicolas.ferlut@gmail.com'}}
        const organizerList = await usersModel.findAll({ where: { organizer: true } })
        if (organizerList.length !== 0) {
            throw new CodeError('You have to delete the previous organizer to add this one !', status.BAD_REQUEST)
        }
        if (!has(req.body, ['email'])) throw new CodeError('You must specify the  email', status.BAD_REQUEST)
        const {
            email
        } = req.body
        const userData = await usersModel.findOne({
            where: {
                email
            }
        })
        if (userData) {
            usersModel.update({
                organizer: true
            }, { where: {email} })
            res.json({
                status: true,
                message: 'Organizer set'
            })
        }
        res.json({
            status: false,
            message: 'User Does\'nt Exists'
        })
    },
    async getPlanningHistory(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Get Planning History'
        let data = []
        const planning = await activesModel.findAll({where: {permanence: true}, order: [['date', 'DESC']]})
        for (const elem of planning) {
            const {consumerId} = elem
            const dataUser = await usersModel.findOne({where: {userId: consumerId}})
            data.push({...elem['dataValues'], ...dataUser['dataValues']})
        }
        res.json({
            status: true,
            message: 'Returning Planning History',
            data: data
        })
    }
    ,
    async deleteOrganizer(req, res) {
        // #swagger.tags = ['Organizer']
        // #swagger.summary = 'Delete All Organizers'
        usersModel.update({organizer: false}, {where: {organizer: true}})
        res.json({
            status: true,
            message: 'Organizers Deleted'
        })
    }
}

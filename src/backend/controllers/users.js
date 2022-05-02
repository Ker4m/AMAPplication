const status = require('http-status')
const CodeError = require('../utils/CodeError.js')
const usersModel = require('../models/users')
const has = require('has-keys')

module.exports = {
    async newUser(req, res, next) {
        // #swagger.ignore = true
        if (!has(req.body, ['firstName', 'name', 'address', 'email'])) throw new CodeError('You must specify the first name, name, address and email', status.BAD_REQUEST)
        const {
            firstName,
            name,
            address,
            email
        } = req.body
        const isName = await usersModel.findOne({where: {firstName, name, address, email}})
        if (!isName) {
            await usersModel.create({
                firstName,
                name,
                address,
                email,
                organizer: false
            })
        }
        next()
    }
}

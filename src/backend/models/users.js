const Sequelize = require('sequelize')
const db = require('./database.js')

const users = db.define('users', {
    userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },
    name: {
        type: Sequelize.STRING,
        validate: {notEmpty: true}
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {isEmail: true}
    },
    organizer: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = users

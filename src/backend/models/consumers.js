const Sequelize = require('sequelize')
const db = require('./database.js')
const users = require('./users.js')

const consumers = db.define('consumers', {
    consumerId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
})

consumers.belongsTo(users, {
    foreignKey: {
        name: 'consumerId'
    }
})

module.exports = consumers

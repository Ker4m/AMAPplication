const Sequelize = require('sequelize')
const db = require('./database.js')
const users = require('./users.js')

const producers = db.define('producers', {
    producerId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    }
})

producers.belongsTo(users, {
    foreignKey: {
        name: 'producerId'
    }
})

module.exports = producers

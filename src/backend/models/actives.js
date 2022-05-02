const Sequelize = require('sequelize')
const db = require('./database')
const consumers = require('./consumers')

const actives = db.define('actives', {
    consumerId: {
        type: Sequelize.INTEGER,
        references: {
            model: consumers,
            key: 'consumerId',
            onDelete: 'CASCADE'
        },
    },
    date: Sequelize.DATEONLY,
    available: Sequelize.BOOLEAN,
    permanence: Sequelize.BOOLEAN
}, {
    uniqueKeys: {
        Items_unique: {
            fields: ['date', 'consumerId']
        }
    }
})


module.exports = actives

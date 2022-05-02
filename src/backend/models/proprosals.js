const Sequelize = require('sequelize')
const db = require('./database.js')
const producers = require('./producers.js')

const proposals = db.define('proposals', {
    proposalId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false
    },
    beginningProposal: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: Sequelize.INTEGER
    ,
    proposalProducerId: {
        type: Sequelize.INTEGER,
        references: {
            model: producers,
            key: 'producerId',
            onDelete: 'CASCADE'
        }
    }
})

module.exports = proposals

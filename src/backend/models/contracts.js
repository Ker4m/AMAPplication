const Sequelize = require('sequelize')
const db = require('./database.js')
const consumers = require('./consumers.js')
const proposals = require('./proprosals.js')
const producers = require('./producers.js')

const contracts = db.define('contracts', {
    contractId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    quantityForConsumer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    unitForConsumer: Sequelize.STRING
    ,
    beginningContract: {
        type: Sequelize.DATEONLY
    },
    durationContract: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    expirationDate: Sequelize.DATEONLY
    ,
    contractProduct: {
        type: Sequelize.STRING,
    },
    contractConsumerId: {
        type: Sequelize.INTEGER,
        references: {
            model: consumers,
            key: 'consumerId',
            onDelete: 'CASCADE'
        }
    },
    contractProducerId: {
        type: Sequelize.INTEGER,
        references: {
            model: producers,
            key: 'producerId',
            onDelete: 'CASCADE'
        }
    },
    status: Sequelize.INTEGER
})

contracts.belongsTo(proposals, {
    foreignKey: {
        name: 'proposalId',
        onDelete: 'CASCADE'
    }
})

module.exports = contracts
const express = require('express')
const router = express.Router()
const utils = require('../controllers/utils.js')
const consumers = require('../controllers/consumers')
const users = require('../controllers/users')
const producers = require('../controllers/producers.js')

require('mandatoryenv').load(['TEST_MODE'])
const {TEST_MODE} = process.env

let login
// This is to use a special authentication for test with no need of token
if (TEST_MODE === 'enabled') {
    login = require('../controllers/loginTest')
} else {
    login = require('../controllers/login')
}


router.get('/consumers', consumers.getConsumers)
router.post('/consumers', users.newUser, consumers.newConsumer)
router.put('/consumers', utils.methodNotAllowed)
router.delete('/consumers', consumers.deleteConsumers)

router.get('/consumers/active', login.isOrganizer, consumers.setActives, consumers.getActivesConsumers)
router.post('/consumers/active', utils.methodNotAllowed)
router.put('/consumers/active', utils.methodNotAllowed)
router.delete('/consumers/active', utils.methodNotAllowed)

router.get('/consumers/available', consumers.setActives, consumers.getAvailableConsumers)
router.post('/consumers/available', utils.methodNotAllowed)
router.put('/consumers/available', utils.methodNotAllowed)
router.delete('/consumers/available', utils.methodNotAllowed)

router.get('/consumers/permanence', consumers.setActives, consumers.getPermaConsumers)
router.post('/consumers/permanence', utils.methodNotAllowed)
router.put('/consumers/permanence', utils.methodNotAllowed)
router.delete('/consumers/permanence', utils.methodNotAllowed)

router.get('/consumers/:id', login.isConsumer, consumers.getConsumersById)
router.post('/consumers/:id', utils.methodNotAllowed)
router.put('/consumers/:id', login.isConsumer, consumers.modifyConsumerById)
router.delete('/consumers/:id', login.isConsumer, consumers.deleteConsumerById)

router.get('/consumers/:id/contracts', login.isConsumer, consumers.verifyContract, consumers.getAllContractsByConsumerId)
router.post('/consumers/:id/contracts', utils.methodNotAllowed)
router.put('/consumers/:id/contracts', utils.methodNotAllowed)
router.delete('/consumers/:id/contracts', login.isConsumer, consumers.deleteContractsByConsumerId)

router.get('/consumers/:id/contracts/:cid', login.isConsumer, consumers.verifyContractId, consumers.getContractByIds)
router.post('/consumers/:id/contracts/:cid', utils.methodNotAllowed)
router.put('/consumers/:id/contracts/:cid', utils.methodNotAllowed)
router.delete('/consumers/:id/contracts/:cid', login.isConsumer, consumers.verifyContractId, consumers.deleteContractByIds)

router.get('/producers/:id/contracts/:cid', utils.methodNotAllowed)
router.post('/producers/:id/contracts/:cid', utils.methodNotAllowed)
router.put('/producers/:id/contracts/:cid', login.isProducer, consumers.verifyContractId, consumers.setValidated)
router.delete('/producers/:id/contracts/:cid', login.isProducer, consumers.verifyContractId, producers.deleteContractByIds)

router.get('/consumers/:id/active', login.isConsumer, consumers.getActivesForConsumerId)
router.post('/consumers/:id/active', utils.methodNotAllowed)
router.put('/consumers/:id/active', utils.methodNotAllowed)
router.delete('/consumers/:id/active', utils.methodNotAllowed)

router.get('/consumers/:id/available', login.isConsumer, consumers.setActives, consumers.getAvailableForConsumerId)
router.post('/consumers/:id/available', login.isConsumer, consumers.setConsumerAvailable)
router.put('/consumers/:id/available', login.isConsumer, consumers.setActives, consumers.setConsumerNotAvailable)
router.delete('/consumers/:id/available', utils.methodNotAllowed)

router.get('/consumers/:id/permanence', consumers.setActives, consumers.getPermaForConsumerId)
router.post('/consumers/:id/permanence', login.isOrganizer, consumers.setActives, consumers.setConsumerPerma)
router.put('/consumers/:id/permanence', login.isOrganizer, consumers.setActives, consumers.setConsumerNotPerma)
router.delete('/consumers/:id/permanence', utils.methodNotAllowed)

router.get('/consumers/:id/proposals/:pid', utils.methodNotAllowed)
router.post('/consumers/:id/proposals/:pid', login.isConsumer, producers.verifyProposalId, consumers.newContract)
router.put('/consumers/:id/proposals/:pid', utils.methodNotAllowed)
router.delete('/consumers/:id/proposals/:pid', utils.methodNotAllowed)

module.exports = router

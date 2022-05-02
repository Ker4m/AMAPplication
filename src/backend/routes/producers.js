const express = require('express')
const router = express.Router()
const utils = require('../controllers/utils.js')
const producers = require('../controllers/producers')
const users = require('../controllers/users')

require('mandatoryenv').load(['TEST_MODE'])
const {TEST_MODE} = process.env

let login
// This is to use a special authentication for test with no need of token
if (TEST_MODE === 'enabled') {
    login = require('../controllers/loginTest')
} else {
    login = require('../controllers/login')
}


router.get('/producers', producers.getProducers)
router.post('/producers', users.newUser, producers.newProducer)
router.put('/producers', utils.methodNotAllowed)
router.delete('/producers', producers.deleteProducers)

router.get('/producers/proposals/', producers.verifyProposals, producers.getAllProposals)
router.post('/producers/proposals/', utils.methodNotAllowed)
router.put('/producers/proposals/', utils.methodNotAllowed)
router.delete('/producers/proposals/', utils.methodNotAllowed)

router.get('/producers/:id', login.isProducer, producers.getProducersById)
router.post('/producers/:id', utils.methodNotAllowed)
router.put('/producers/:id', login.isProducer, producers.modifyProducerById)
router.delete('/producers/:id', login.isProducer, producers.deleteProducerById)

router.get('/producers/:id/proposals', producers.verifyProposals, login.isProducer, producers.getAllProposalsByProducerId)
router.post('/producers/:id/proposals', login.isProducer, producers.newProposalByProducerId)
router.put('/producers/:id/proposals', utils.methodNotAllowed)
router.delete('/producers/:id/proposals', login.isProducer, producers.deleteProposalsByProducerId)

router.get('/producers/:id/proposals/:pid', producers.verifyProposals, login.isProducer, producers.verifyProposalId, producers.getProposalOfProducerByIds)
router.post('/producers/:id/proposals/:pid', utils.methodNotAllowed)
router.put('/producers/:id/proposals/:pid', utils.methodNotAllowed)
router.delete('/producers/:id/proposals/:pid', login.isProducer, producers.verifyProposalId, producers.deleteProposalOfProducerByIds)

router.get('/producers/:id/contracts', producers.verifyProducerId, login.isProducer, producers.getContractsByProducerId)
router.post('/producers/:id/contracts', utils.methodNotAllowed)
router.put('/producers/:id/contracts', utils.methodNotAllowed)
router.delete('/producers/:id/contracts', utils.methodNotAllowed)

module.exports = router

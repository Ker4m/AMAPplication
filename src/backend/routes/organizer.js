const express = require('express')
const organizer = require('../controllers/organizer')
const router = express.Router()
const utils = require('../controllers/utils')

require('mandatoryenv').load(['TEST_MODE'])
const {TEST_MODE} = process.env

let login
// This is to use a special authentication for test with no need of token
if (TEST_MODE === 'enabled') {
    login = require('../controllers/loginTest')
} else {
    login = require('../controllers/login')
}


router.get('/organizer', organizer.getOrganizer)
router.post('/organizer', organizer.newOrganizer)
router.put('/organizer', organizer.setNewOrganizer)
router.delete('/organizer', organizer.deleteOrganizer)

router.get('/organizer/planning', login.isOrganizer, organizer.getPlanningHistory)
router.post('/organizer/planning', utils.notYetImplemented)
router.put('/organizer/planning', utils.notYetImplemented)
router.delete('/organizer/planning', utils.notYetImplemented)

module.exports = router

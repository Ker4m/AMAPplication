const express = require('express')
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


router.get('/login', login.callGoogleAuth)
router.post('/login', login.sendUserData)
router.put('/login', utils.methodNotAllowed)
router.delete('/login', utils.methodNotAllowed)

router.get('/oauth2callback', login.sendToken)
router.post('/oauth2callback', utils.methodNotAllowed)
router.put('/oauth2callback', utils.methodNotAllowed)
router.delete('/oauth2callback', utils.methodNotAllowed)

module.exports = router

const router = require('express').Router()

router.use(require('./organizer.js'))
router.use(require('./producers.js'))
router.use(require('./consumers.js'))
router.use(require('./login.js'))

module.exports = router

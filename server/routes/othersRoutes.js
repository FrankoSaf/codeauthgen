const router = require('express').Router()
const contactUsController = require('../controllers/contactUsController')

router.post('/contact', contactUsController)

module.exports = router
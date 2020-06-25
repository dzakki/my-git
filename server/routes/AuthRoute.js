const router = require('express').Router()

const AuthController = require('../controllers/AuthController')

router.post('/gihub-signin/:code', AuthController.githubSignin)

module.exports = router
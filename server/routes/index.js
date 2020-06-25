const router = require('express').Router()
const Authentication = require('../middlewares/Authentication')

const GithubRoutes = require('./GithubRoutes')
const AuthRoutes = require('./AuthRoute')

router.use('/api/auth', AuthRoutes)

router.use('/api/github', Authentication)
router.use('/api/github', GithubRoutes)


module.exports =  router
const router = require('express').Router()
const GithubRoutes = require('./GithubRoutes')

router.use('/github', GithubRoutes)

module.exports =  router
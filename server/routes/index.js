const router = require('express').Router()
const GithubRoutes = require('./GithubRoutes')

router.use('/api/github', GithubRoutes)

module.exports =  router
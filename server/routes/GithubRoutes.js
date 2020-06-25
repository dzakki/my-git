const router = require('express').Router()
const GithubController = require('../controllers/GithubController')
router.use(function (req, res, next) {  
    req.githubUrl = 'https://api.github.com'
    // req.githubToken = "94d842655e45a120bb6c901529d6624fa196606f"
    next()
})
router.get('/stars', GithubController.getRepoStars)
router.get('/stars/:username/:repo', GithubController.getRepoStar)
router.delete('/stars/:username/:repo', GithubController.unStar)
router.post('/repos', GithubController.createRepo)
router.get('/repos/:username', GithubController.getOtherRepo)
router.get('/:username/:repo/languages', GithubController.getRepoLanguages)


module.exports = router
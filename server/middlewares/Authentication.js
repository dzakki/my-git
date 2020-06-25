module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        req.githubToken = req.headers.token
        next()
    }else{
        res.status(404).json({
            msg: 'token not found'
        })
    }
}
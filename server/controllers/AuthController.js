const axios = require('axios')

class AuthController{

    static githubSignin(req, res, next){
        axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            params: {
                client_id: '57f03755a612f4c8dcc0',
                client_secret:  process.env.GITHUB_SECRET,
                code: req.params.code
            },
            headers: {
                Accept: 'application/json'
            }
        })
        .then(({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }

}

module.exports = AuthController
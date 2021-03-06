const axios = require('axios')
class GithubController{

    static getRepoStars(req, res, next){

        console.log(req.githubToken, '============')
        axios.get(`${req.githubUrl}/user/starred`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then(({ data }) => {
            if (req.query.repo) {
                const repos = []
                data.forEach(repo => {
                    if (repo.name.includes(req.query.repo)) {
                        repos.push(repo)
                    }
                });
                res.status(200).json({
                    data: repos
                })
            }else if (req.query.username) {
                const repos = []
                data.forEach(repo => {
                    if (repo.owner.login.includes(req.query.username)) {
                        repos.push(repo)
                    }
                });
                res.status(200).json({
                    data: repos
                })
            }
            else{
                res.status(200).json({
                    data
                })
            }
        })
        .catch(next)
    }

    static getRepoStar(req, res, next){
        console.log(req.params)
        return axios.get(`${req.githubUrl}/user/starred/${req.params.username}/${req.params.repo}`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then(({data}) => {
            if(!data){
                // https://api.github.com/repos/rizafahmi/ceritanya-developer
                return axios.get(`${req.githubUrl}/repos/${req.params.username}/${req.params.repo}`, {
                    headers: {
                        Authorization: `token ${req.token}`
                    }
                })
            }
        })
        .then( ({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }

    static createRepo(req, res, next){
        // /user/repos
        const form = {
            name: req.body.name,
            description: req.body.description,
            private: req.body.private
        }
        return axios.post(`${req.githubUrl}/user/repos`, form, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then( ({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }

    static getOtherRepo(req, res, next){
        // /users/:username/repos
        return axios.get(`${req.githubUrl}/users/${req.params.username}/repos`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then( ({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }

    static unStar(req, res, next){
        // /user/starred/:owner/:repo
        return axios.delete(`${req.githubUrl}/user/starred/${req.params.username}/${req.params.repo}`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then( ({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }
    
    static getRepoLanguages(req, res, next){
        axios.get(`${req.githubUrl}/${req.params.username}/${req.params.repo}/languages`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then( ({data}) => {
            res.status(200).json({
                data
            })
        })
        .catch(next)
    }
}

module.exports = GithubController
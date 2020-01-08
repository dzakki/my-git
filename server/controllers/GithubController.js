const axios = require('axios')
class GithubController{

    static getRepoStars(req, res, next){
        axios.get(`${req.githubUrl}/user/starred`, {
            headers: {
                Authorization: `token ${req.githubToken}`
            }
        })
        .then(({ data }) => {
            res.status(200).json({
                data
            })
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
                        Authorization: `token ${req.githubToken}`
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

    static unStart(req, res, next){
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
    
}

module.exports = GithubController
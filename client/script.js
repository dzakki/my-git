const apiUrl = 'http://localhost:3000/api'

$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('#github-login').hide()
        $(".intro").hide()
        $('#logout').show()
        $('#home').show('slow')
        generateReposStar()
        generateOwnerStar()
    }else{
        const code = getUrlVars()
        if (code) {
            if (!localStorage.getItem('token')) {
                getToken(code, (err, token) => {
                    if (!err) {
                        localStorage.setItem('token', token.data.access_token)
                        $('#github-login').hide()
                        $(".intro").hide()
                        $('#home').show('slow')
                        $('#logout').show()
                        generateReposStar()
                        generateOwnerStar()   
                    }
                })     
            }
        }
    }
    $('#logout').click(function (e) { 
        e.preventDefault();
        localStorage.clear()
        $('#github-login').show('slow')
        $('#home').hide('slow')
        $('#logout').hide()
        $(".intro").show('slow')
    });
    $('#filterStarRepo').click(function (e) { 
        e.preventDefault();
        const elFilter =  $('#filter')
        elFilter.attr('readonly', false);
        elFilter.attr('placeholder', 'repoName')
        elFilter.attr('data-filter', 'filterStarRepo')
        elFilter.val("")
    });
    $('#filterOtherRepos').click(function (e) { 
        e.preventDefault();
        const elFilter =  $('#filter')
        elFilter.attr('readonly', false);
        elFilter.attr('placeholder', 'username')
        elFilter.attr('data-filter', 'filterOtherRepos')
        elFilter.val("")
    });

    $(document).on('keyup', '#filter', function (e) {  
        const filter = $(this).attr('data-filter')
        if (filter) {
            if (filter === 'filterStarRepo') {
                const query = '?repo=' + $(this).val()
                generateReposStar(query)
            }else{
                const query = '?username=' + $(this).val()
                generateReposStar(query)
            }   
        }
    })

    $(document).on('click', '.usernameRepo', function () {  
        const query = '?username=' + $(this).attr('data-username')
        generateReposStar(query)
    })

});

const generateOwnerStar = () => {
    ReposStar(null, (err, repos) => {
        const owners = []
        const elUserStar = $('#userStar')
        elUserStar.empty()
        repos.forEach(repo => {
            if (!owners.includes(repo.owner.login)) {
                owners.push(repo.owner.login)
                const html = `<div class="hide" id="username-${repo.id}">
                                <a class="usernameRepo" href="JavaScript:void(0);" data-username="${repo.owner.login}">
                                    ${repo.owner.login}
                                </a>
                            </div>`
                elUserStar.append(html)
                $(`#username-${repo.id}`).show('slow')
            }
        });
    })
}
const generateReposStar = (q = null) => {
    ReposStar(q, (err, repos) => {
        if (!err) {
            const elReposStar = $('#reposStar')
            elReposStar.empty();
            for (let i = 0; i < repos.length; i++) {
                let html = `
                    <div  class="hide" id="repo-${repos[i].id}">
                        <div class="card shadow-sm mb-2">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <small>${repos[i].full_name}</small>
                                </h5>
                                <h6 class="card-subtitle mb-2 text-muted"><small>${repos[i].description}</small></h6>
                                <div class="mb-1"></div>
                                <span class="float-left">${repos[i].stargazers_count} stars</span> <span class="float-right"> <a href="${repos[i].html_url}">View in github</a> </span>
                            </div>
                        </div>
                    </div>
                    `
                    elReposStar.append(html);
                    $(`#repo-${repos[i].id}`).show('slow');
            }   
        }
    })
}
const ReposStar = (q ,cb) => {
    let query = q || ""
    
    console.log(apiUrl + '/github/stars'+query)

    $.ajax({
        url: apiUrl + '/github/stars'+query,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(res => {
        cb(null, res.data)
    })
    .fail(errs => {
        cb(errs)
    })
}
const RepoLanguages = (url, cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl + '/github/'+url+'/languages'
    })
    .done(res => {
        cb(null, res)
    })
    .fail(errs => {
        cb(errs)
    })
}

const getToken = function (code, cb) {  
    $.ajax({
        type: "POST",
        url: apiUrl+"/auth/gihub-signin/"+code
    })
    .done(res => {
        cb(null,res)
    })
    .fail(errs => {
        cb(errs)
    })
}

function getUrlVars(){
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars['code'];
}
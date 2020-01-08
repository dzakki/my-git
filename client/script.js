const apiUrl = 'http://localhost:3300/api'
$(document).ready(function () {
    generateReposStar()
    $('#filterStarRepo').click(function (e) { 
        e.preventDefault();
        const elFilter =  $('#filter')
        elFilter.attr('readonly', false);
        elFilter.attr('placeholder', 'username/repoName')
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
                generateFilterReposStar($(this).val())
            }else{
                console.log(filter)
                generateFilterOtherRepos($(this).val())
            }   
        }
    })

});

const generateFilterOtherRepos = (params) => {
    FilterOtherRepos(params, (err, repos) => {
        if (!err) {
            const elReposStar = $('#reposStar')
            elReposStar.empty();
            for (let i = 0; i < repos.length; i++) {
                RepoLanguages(repos[i].languages_url, (err, languages) => {
                    let languagesHtml = ''
                    for (const key in languages) {
                        languagesHtml += `<a href="#" class="card-link">${key}</a>`
                    }
                    let html = `
                    <div class="card  shadow-sm mb-2">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <small>${repos[i].full_name}</small>
                                </h5>
                                <h6 class="card-subtitle mb-2 text-muted"><small>${repos[i].description}</small></h6>
                                ${languagesHtml}
                                <div class="mb-1"></div>
                                <span class="float-left">${repos[i].stargazers_count} stars</span> <span class="float-right"> <a href="${repos[i].html_url}">View in github</a> </span>
                            </div>
                        </div>
                    `
                    elReposStar.append(html).fadeIn('slow');
                })
            }   
        }
    })
}

const generateFilterReposStar = (params) => {
    FilterStarRepo(params, (err, repo) => {
        if (!err) {
            const elReposStar = $('#reposStar')
            elReposStar.empty()
            RepoLanguages(repo.languages_url, (err, languages) => {
                let languagesHtml = ''
                for (const key in languages) {
                    languagesHtml += `<a href="#" class="card-link">${key}</a>`
                }
                let html = `
                <div class="card  shadow-sm mb-2">
                        <div class="card-body">
                            <h5 class="card-title">
                                <small>${repo.full_name}</small>
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted"><small>${repo.description}</small></h6>
                            ${languagesHtml}
                            <div class="mb-1"></div>
                            <span class="float-left">${repo.stargazers_count} stars</span> <span class="float-right"> <a href="${repo.html_url}">View in github</a> </span>
                        </div>
                    </div>
                `
                elReposStar.append(html).fadeIn('slow');
            })
        }
    })
}

const generateReposStar = () => {
    ReposStar((err, repos) => {
        if (!err) {
            const elReposStar = $('#reposStar')
            elReposStar.empty();
            for (let i = 0; i < repos.length; i++) {
                RepoLanguages(repos[i].languages_url, (err, languages) => {
                    let languagesHtml = ''
                    for (const key in languages) {
                        languagesHtml += `<a href="#" class="card-link">${key}</a>`
                    }
                    let html = `
                    <div class="card  shadow-sm mb-2">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <small>${repos[i].full_name}</small>
                                </h5>
                                <h6 class="card-subtitle mb-2 text-muted"><small>${repos[i].description}</small></h6>
                                ${languagesHtml}
                                <div class="mb-1"></div>
                                <span class="float-left">${repos[i].stargazers_count} stars</span> <span class="float-right"> <a href="${repos[i].html_url}">View in github</a> </span>
                            </div>
                        </div>
                    `
                    elReposStar.append(html).fadeIn('slow');
                })
            }   
        }
    })
}
const ReposStar = (cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl + '/github/stars'
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
        url: url
    })
    .done(res => {
        cb(null, res)
    })
    .fail(errs => {
        cb(errs)
    })
}
const FilterStarRepo = (params, cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl + '/github/stars/'+params
    })
    .done(res => {
        cb(null, res.data)
    })
    .fail(errs => {
        cb(errs)
    })
}

const FilterOtherRepos = (params, cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl + '/github/repos/'+params
    })
    .done(res => {
        cb(null, res.data)
    })
    .fail(errs => {
        cb(errs)
    })
}
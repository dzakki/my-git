const express = require('express')
const app = express()
const port = 3300

app.use(express.json())
app.use(express.urlencoded({  extended: false }))

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const router = require('./routes')
const errorHandling = require('./middlewares/errorHandling')
app.use('/', router)

app.use(errorHandling)

app.listen(port, function () {  
    console.log('app listened in port: '+port)
})
if(process.env.NODE_ENV = "development") {
    require("dotenv").config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({  extended: false }))

const errorHandling = require('./middlewares/errorHandling')
const router = require('./routes')

app.use('/', router)

app.use(errorHandling)

app.listen(port, function () {  
    console.log('app listened in port: '+port)
})
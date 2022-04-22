/****************************************/
/*  Priority Game Backend               */
/* ____________________________________ */
/* Author: Jonathan Eberle              */
/****************************************/


// provide imports for node with express
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')


// setup database connection to mongo with mongoose
const db = require('./util/database')


// include routing
const ticketRoutes = require('./routes/ticket.js')
const generalRoutes = require('./routes/general.js')


// config server
const app = express()
const port = 3000

// enable http from and to different clients/servers
app.use(cors())

// setup body-parsing for http requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add routes to server
app.use(ticketRoutes)
app.use(generalRoutes)


// init server
app.listen(process.env.PORT || port, () => {
  console.log('Express Server listening on Port: ' + port)
})
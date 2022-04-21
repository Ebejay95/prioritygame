const express = require('express')
const db = require('./util/database')
const ticketRoutes = require('./routes/ticket.js')
const rootRoutes = require('./routes/root.js')
const rootController = require('./controllers/rootController')
var cors = require('cors')

// Config Server
const app = express()
const port = 3000
app.use(cors())

// Add Routing
app.use(ticketRoutes);
app.use(rootRoutes);

// catch not found routes - 404
app.use(rootController.get404);

// init
app.listen(process.env.PORT || port, () => {
  console.log('Express Server listening on Port: ' + port)
})
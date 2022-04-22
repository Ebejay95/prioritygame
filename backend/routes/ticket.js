/****************************************/
/*  Ticket routes                       */
/****************************************/


// necessary routing imports
const express = require('express')
const router = express.Router()

// provide controllers
const ticketController = require('../controllers/ticketController')

// POST - add Ticket
router.post('/tickets/add', ticketController.postAddTicket)

// POST - edit Ticket
router.post('/tickets/edit', ticketController.postEditTicket)

// POST - delete Ticket
router.post('/tickets/delete', ticketController.postDeleteTicket)

// POST - change impact of Ticket
router.post('/tickets/change-impact', ticketController.postChangeImpactTicket)

// GET - ticket by id
router.get('/tickets/:_id', ticketController.getTicket)

// GET - all tickets
router.get('/tickets', ticketController.getAllTickets)

// export
module.exports = router
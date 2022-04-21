const express = require('express');
const router = express.Router();

// Provide Controllers
const ticketController = require('../controllers/ticketController');


// GET - ticket by id
router.get('/tickets/:id', ticketController.getTicket);

// POST - add Ticket
router.post('/tickets/add', ticketController.postAddTicket);

// GET - tickets
router.get('/tickets', ticketController.getAllTickets);

module.exports = router;

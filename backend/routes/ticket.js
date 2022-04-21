const express = require('express');
const router = express.Router();

// Provide Controllers
const ticketController = require('../controllers/ticketController');

// GET - tickets
router.get('/tickets', ticketController.getAllTickets);

// POST - add Ticket
router.post('/tickets/add', ticketController.postAddTicket);

module.exports = router;

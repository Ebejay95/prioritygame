const express = require('express');
const router = express.Router();

// Provide Controllers
const rootController = require('../controllers/rootController');

// GET - Root
router.get('/', rootController.get404);

module.exports = router;
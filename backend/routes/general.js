/****************************************/
/*  General routes                      */
/****************************************/


// necessary routing imports
const express = require('express')
const router = express.Router()

// provide controllers
const generalController = require('../controllers/generalController')

// GET - Root / Any invalid Route
router.get('/', generalController.get404)

// export
module.exports = router
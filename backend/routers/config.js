const express = require('express');
const router = express.Router();

const configController = require('../controllers/ConfigController');

router.get('/paypal', configController.paypal);

module.exports = router;
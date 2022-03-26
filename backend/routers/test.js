const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController');

router.post('/send-mail', testController.sendMail);

module.exports = router;
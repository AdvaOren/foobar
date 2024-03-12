const express = require("express");
const router = express.Router();
const token = require('../controller/tokens');


//move to process login
router.post('/', token.processLogin);

module.exports = router;
const express = require("express");
const router = express.Router();
const token = require('../controller/tokens');



router.post('/tokens', token.isLoggedIn);

module.exports = router;
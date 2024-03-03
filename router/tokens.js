const express = require("express");
const router = express.Router();
const token = require('../controller/tokens');



router.post('/', token.isLoggedIn);

module.exports = router;
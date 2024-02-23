//route to user functions
const express = require("express");
const user = require("../controller/users.js");

const router = express.Router();

router.route('/')
    .post(user.createUser)
export default router;
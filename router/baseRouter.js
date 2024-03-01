const express = require("express");
const users = require("./users.js");
const router = express.Router();
const tokens = require("./tokens.js");
const posts = require("./posts.js")
const friends = require("./friends.js");

router.use("/api/users", users);
router.use("/api/users", friends);

router.use("/api/tokens", tokens);
router.use("/api/posts", posts)
module.exports =
    router

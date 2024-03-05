const express = require("express");
const post = require("../controller/posts.js");
const friend = require("../controller/friend.js");
const router = express.Router();
const tokens = require("../controller/tokens");

router.get('/',tokens.isLoggedIn, post.get25Posts);

//TODO users/:id/posts GET

//TODO Add route to update content and image


// Creates a new post.
router.post('/:id/posts', tokens.isLoggedIn, post.createPost);

// Updates the content of a post.
router.put('/:id/posts/:pid', tokens.isLoggedIn, post.updatePostContent);

// Deletes a post by its ID.
router.delete('/:id/posts/:pid', tokens.isLoggedIn, post.deletePost);

// Retrieves a post by its ID.
router.get('/:id/posts/:pid', tokens.isLoggedIn, post.getPostById);

// Retrieves all posts of user.
router.get('/:id/posts', tokens.isLoggedIn, post.getPostsByUser);


// Retrieves the author of a post by post id.
router.get('/posts/:pid', tokens.isLoggedIn, post.getAuthor);
module.exports =
    router















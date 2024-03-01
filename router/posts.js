const express = require("express");
const post = require("../controller/posts.js");
const friend = require("../controller/friend.js");
const router = express.Router();

//TODO last 25 posts GET
// router.get('/posts', );

//TODO users/:id/posts GET

//TODO Add route to update content and image


// Creates a new post.
router.post('/:id/posts', post.createPost);

// Updates the content of a post.
router.put('/:id/posts/:pid', post.updatePostContent);

// Deletes a post by its ID.
router.delete('/:id/posts/:pid', post.deletePost);

// Retrieves a post by its ID.
router.get('/:id/posts/:pid', post.getPostById);

// Retrieves all posts.
router.get('/allPosts', post.getPosts);


// Retrieves the author of a post by post id.
router.get('/posts/:pid', post.getAuthor);
module.exports =
    router















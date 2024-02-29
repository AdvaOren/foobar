const express = require("express");
const friend = require("../controller/friend.js");
const tokens = require("../controller/tokens");
const router = express.Router();

// Retrieves all friends of a user.
router.get('/users/:id/friends', tokens.isLoggedIn, friend.getFriendsOfUser)

// Creates a new friendship between two users.
router.post('/users/:id/friends', tokens.isLoggedIn, friend.createFriends);

// TODO Add accept req
//router.patch('users/:id/friends/:fid', )

// Deletes a friendship between two users.
router.delete('users/:id/friends/:fid', tokens.isLoggedIn, friend.deleteFriends);

// Checks if two users are friends.
router.get('users/:id/friends/:fid', tokens.isLoggedIn, friend.deleteFriends);


module.exports =
    router
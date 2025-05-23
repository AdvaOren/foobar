const express = require("express");
const friend = require("../controller/friend.js");
const tokens = require("../controller/tokens");
const router = express.Router();

// Retrieves all friends of a user.
router.get('/:id/friends', tokens.isLoggedIn, friend.getFriendsOfUser)

// Retrieves all the users that ask to be friends.
router.get('/:id/friendsAsk', tokens.isLoggedIn, friend.getAskFriendsOfUser)

// Creates a new friendship between two users.
router.post('/:id/friends', tokens.isLoggedIn, friend.createFriends);

// Accept friendship between two users
router.patch('/:id/friends/:fid', tokens.isLoggedIn, friend.acceptFriendship);

// Deletes a friendship between two users.
router.delete('/:id/friends/:fid', tokens.isLoggedIn, friend.deleteFriends);

// Return the friendship.
router.get('/:id/friends/:fid', tokens.isLoggedIn, friend.getFriendship);

router.get('/:id/allFriendsRequest', tokens.isLoggedIn, friend.getAllFriendsRequest)

module.exports =
    router
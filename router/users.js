//route to user functions
const express = require("express");
const user = require("../controller/users.js");
const tokens = require("../controller/tokens");

const router = express.Router();


//TODO add token

// Create new user
router.post('/users', user.createUser);

// Finds a user by his email address.
router.get('/users/:email', user.getUserByEmail);

// Finds a user by his ID.
router.get('/users/:email', user.getUserById);

// Updates a user's information.
router.put('/users/:id', tokens.isLoggedIn, user.updateUser);

// Updates a user's profile image.
router.put('/users/updImage/:id', tokens.isLoggedIn, user.updateUserImg);

// Retrieves all user emails.
router.get('/users/allEmails', user.getEmails);

// Deletes a user by his ID.
router.delete('/users/:id', tokens.isLoggedIn, user.deleteUser);

// Deletes a user by his email address.
router.delete('/users/:email', tokens.isLoggedIn, user.deleteUserByEmail);

module.exports =
    router
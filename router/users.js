//route to user functions
const express = require("express");
const user = require("../controller/users.js");
const tokens = require("../controller/tokens");

const router = express.Router();

// Create new user
router.post('/', user.createUser);

// Finds a user by his email address.
router.get('/:email', user.getUserByEmail);

// Updates a user's profile image.
router.put('/updImage/:id', tokens.isLoggedIn, user.updateUserImg);

// Updates a user's information.
router.put('/:id', tokens.isLoggedIn, user.updateUser);

// Update a user's information and profile image
router.patch('/:id', tokens.isLoggedIn, user.updateUserAll);

// Retrieves all user emails.
router.get('/allEmails', user.getEmails);

// Deletes a user by his ID.
router.delete('/:id', tokens.isLoggedIn, user.deleteUser);

// Deletes a user by his email address.
router.delete('/:email', tokens.isLoggedIn, user.deleteUserByEmail);

// Finds if user exists by email and password
router.get('/exists/:email/:password' , user.findUserExists);

module.exports = router
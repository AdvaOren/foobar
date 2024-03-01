//route to user functions
const express = require("express");
const user = require("../controller/users.js");

const router = express.Router();


//TODO add token

// Create new user
router.post('/', user.createUser);

// Finds a user by his email address.
router.get('/:email', user.getUserByEmail);

// Finds a user by his ID.
router.get('/:email', user.getUserById);

// Updates a user's information.
router.put('/:id', user.updateUser);

// Updates a user's profile image.
router.put('/updImage/:id', user.updateUserImg);

// Retrieves all user emails.
router.get('/allEmails', user.getEmails);

// Deletes a user by his ID.
router.delete('/:id', user.deleteUser);

// Deletes a user by his email address.
router.delete('/:email', user.deleteUserByEmail);

// Finds if user exists by email and password
router.get('/exists/:email/:password' , user.findUserExists);

module.exports = router
//route to user functions
const express = require("express");
const user = require("../controller/users.js");

const router = express.Router();


//TODO add token

// Create new user
router.post('/users', user.createUser);

// Finds a user by his email address.
router.get('/users/:email', user.getUserByEmail);

// Finds a user by his ID.
router.get('/users/:email', user.getUserById);

// Updates a user's information.
router.put('/users/:id', user.updateUser);

// Updates a user's profile image.
router.put('/users/updImage/:id', user.updateUserImg);

// Retrieves all user emails.
router.get('/users/allEmails', user.getEmails);

// Deletes a user by his ID.
router.delete('/users/:id', user.deleteUser);

// Deletes a user by his email address.
router.delete('/users/:email', user.deleteUserByEmail);













export default router;
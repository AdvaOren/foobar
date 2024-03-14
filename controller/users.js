const user = require("../services/user.js");
const like = require("../services/like");
const comment = require("../services/comment");
const post = require("../models/post.js");
const friend = require("../services/friend.js");
const posts = require("../services/post.js");


/**
 * name: createUser
 * action: delegates task to user service
 * response: json obj of new user
 * **/
async function createUser(req, res) {
    // Extract the image data from the Base64 string
    const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '');

    // Convert the Base64 data to a Buffer
    const imageData = Buffer.from(base64Data, 'base64');


    const newUser = await user.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password, imageData);
    if (newUser !== null)
        res.json(newUser.id);
    else
        res.json(null);
}
/**
 * name: getUserByEmail
 * action: delegates task to user service
 * response: json obj of user mail
 * **/
const getUserByEmail = async (req, res) => {
    // const users = await user.getUserByEmail(req.params.email); 
    // console.log("users", users);
    // res.json("false");

    const users = await user.getUserByEmail(req.params.email);
    res.json(users || {}); // Return an empty object if user is null
   
};

/**
 * name: getUserByEmail
 * action: delegates task to user service
 * response: json obj of user mail
 * **/
const getUserById = async (req, res) => {
    console.log("here toooo");
    res.json(await user.getUserById(req.query.id));
};

/**
 * name: getUserByEmail
 * action: delegates task to user service
 * response: json obj of user mail
 * **/
const getEmails = async (req, res) => {
    res.json(await user.getEmails());
}

/**
 * name: updateUser
 * action: delegates task to user service
 * response: json obj of updated user
 * **/
const updateUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        return res.status(500).json({ errors: ["unable to update, requester is not the user"] });
    }
    res.json(await user.updateUser(req.params.id, req.body.firstName, req.body.lastName, req.body.password));
}


/**
 * name: updateUserImg
 * action: delegates task to user service
 * response: json obj of updated user
 * **/
const updateUserImg = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        return res.status(500).json({ errors: ["unable to update, requester is not the user"] });
    }
    const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '');

    // Convert the Base64 data to a Buffer
    const imageData = Buffer.from(base64Data, 'base64');
    res.json(await user.updateUserImg(req.params.id, imageData));
}

/**
 * name: updateUserAll
 * action: delegates task to user service
 * response: json obj of updated user
 * **/
const updateUserAll = async (req, res) => {
    try {
        if (req.body._id !== req.params.id) {
            return res.status(500).json({ errors: ["unable to update, requester is not the user"] });
        }
        // Update user image
        const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '');
        const imageData = Buffer.from(base64Data, 'base64');
        await user.updateUserImg(req.params.id, imageData);

        // Update user details
        const updateUserResult = await user.updateUser(req.params.id, req.body.firstName, req.body.lastName, req.body.password);

        // Send response
        res.json(updateUserResult);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ errors: ["Error updating user"] });
    }
}


/**
 * name: deleteUser
 * action: delegates task to user service
 * response: json obj of deleted user
 * **/
const deleteUser = async (req, res) => {
    await like.removeLikesByUser(req.params.id);
    await comment.deleteCommentsByUser(req.params.id);
    await friend.deleteAllFriendsByUser(req.params.id);
    await posts.deleteAllPostsByUser(req.params.id);
    res.json(await user.deleteUser(req.params.id));
}


/**
 * name: deleteUserByEmail
 * action: delegates task to user service
 * response: json obj of deleted user
 * **/
const deleteUserByEmail = async (req, res) => {
    if (req.params.userId !== req.params.id) {
        return res.status(500).json({ errors: ["unable to delete, requester is not the user"] });
    }
    await like.removeLikesByUser(req.params.id);
    await comment.deleteCommentsByUser(req.params.id)
    res.json(await user.deleteUserByEmail(req.params.email));
}


/**
 * name: findUserExists
 * action: delegates task to user service
 * response: json obj of if user exists
 * **/
const findUserExists = async (req, res) => {
    res.json(await user.findUserEx(req.params.email, req.params.password));
}

module.exports =
{
    createUser, getUserByEmail, getUserById, getEmails, updateUser, updateUserImg, deleteUser, deleteUserByEmail, findUserExists, updateUserAll
}
const user = require("../services/user.js");
const like = require("../services/like");
const comment = require("../services/comment");

async function createUser(req, res) {
    // Extract the image data from the Base64 string
    const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '');
        
    // Convert the Base64 data to a Buffer
    const imageData = Buffer.from(base64Data, 'base64');

    
    const newUser = await user.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password, imageData);
    res.json(newUser.id);
}

const getUserByEmail = async (req, res) => {
    const a = await user.getUserByEmail(req.params.email);
    if (a !== null)
        res.json({ user: a });
    else
        res.json(await  user.getUserById(req.params.email));
};

const getUserById = async (req, res) => {
    res.json(await user.getUserById(req.query.id));
};
const getEmails = async (req, res) => {
    res.json(await user.getEmails());
}
const updateUser = async (req, res) => {
    if (req.params.userId !== req.params.id) {
        return res.status(500).json({errors: ["unable to update, requester is not the user"]});
    }
    res.json(await user.updateUser(req.params
        .id, req.params.email, req.params.firstName, req.params.lastName, req.params.password));
}
const updateUserImg = async (req, res) => {
    if (req.params.userId !== req.params.id) {
        return res.status(500).json({errors: ["unable to update, requester is not the user"]});
    }
    res.json(await user.updateUserImg(req.params.id, req.params.img));
}
const deleteUser = async (req, res) => {
    if (req.params.userId !== req.params.id) {
        return res.status(500).json({errors: ["unable to delete, requester is not the user"]});
    }
    await like.removeLikesByUser(req.params.id);
    await comment.deleteCommentsByUser(req.params.id)
    res.json(await user.deleteUser(req.params.id));
}
const deleteUserByEmail = async (req, res) => {
    if (req.params.userId !== req.params.id) {
        return res.status(500).json({errors: ["unable to delete, requester is not the user"]});
    }
    await like.removeLikesByUser(req.params.id);
    await comment.deleteCommentsByUser(req.params.id)
    res.json(await user.deleteUserByEmail(req.params.email));
}
const findUserExists = async (req, res) => {
    res.json(await user.findUserEx(req.params.email, req.params.password));
}

module.exports =
{
    createUser, getUserByEmail, getUserById, getEmails, updateUser, updateUserImg, deleteUser, deleteUserByEmail, findUserExists
}
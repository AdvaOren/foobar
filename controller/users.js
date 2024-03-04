const user = require("../services/user.js");
const like = require("../services/like");
const comment = require("../services/comment");

async function createUser(req, res) {
    const newUser = await user.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.img)
    res.json(newUser.id);
}

const getUserByEmail = async (req, res) => {
    res.json(await user.getUserByEmail(req.query.email));
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
module.exports =
    {
        createUser, getUserByEmail, getUserById, getEmails, updateUser, updateUserImg, deleteUser, deleteUserByEmail
    }
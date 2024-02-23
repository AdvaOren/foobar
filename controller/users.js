//get called from router, call service;
import user from "../services/user"

async function createUser(req, res) {
    const newUser = await user.createUser(req.body.email, req.body.firstName, req.body.password, req.body.img)
    res.json(newUser.id);
}

const getUserByEmail = async (req, res) => {
    const found = await user.getUserByEmail(req.body.email);
};

const getUserById = async (req, res) => {
    const found = await user.getUserById(req.body.id);
};
const getEmails = async () => {
    const Emails = await user.getEmails();
}
const updateUser = async (req, res) => {
    const updated = await user.updateUser(req.body.id, req.body.email, req.body.firstName, req.body.lastName, req.body.password);
}
const updateUserImg = async (req, res) => {
    const updated = await user.updateUserImg(req.body.id, req.body.img);
}
const deleteUser = async (req, res) => {
    user.deleteUser(req.id);
}
const deleteUserByEmail = async (req, res) => {
    user.deleteUserByEmail(req.email);
}
module.exports
{
    createUser, getUserByEmail, getUserById , getEmails , updateUser, updateUserImg, deleteUser, deleteUserByEmail
}
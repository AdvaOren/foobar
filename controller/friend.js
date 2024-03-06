const friend = require("../services/friend.js");

const createFriends = async (req, res) => {
    res.json(await friend.createFriends(req.body.requesterId, req.body.requestedId))
}
const deleteFriends = async (req, res) => {
    return await friend.deleteFriends(req.params.user1, req.params.user2);
}
const deleteAllFriendsByUser = async (req, res) => {
    return await friend.deleteAllFriendsByUser(req.params.user);
}
const checkIfFriends = async (req, res) => {
    res.json(await friend.checkIfFriends(req.body.user1, req.body.user2))
}
const getFriendsOfUser = async (req, res) => {
    res.json(await friend.getFriendsOfUser(req.query.user))
}
const getLastPostOfFriends = async (req, res) => {
    res.json(await friend.getLastPostOfFriends(req.query.id))
}
module.exports = {
    createFriends, deleteFriends, deleteAllFriendsByUser, checkIfFriends, getFriendsOfUser, getLastPostOfFriends
}
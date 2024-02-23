const friend = require("../services/friend.js");

const createFriends = async (req, res) => {
    res.json(await friend.createFriends(req.body.user1,req.body.user2))
}
const deleteFriends = async (req, res) => {
    res.json(await friend.deleteFriends(req.body.user1, req.body.user2))
}
const deleteAllFriendsByUser = async (req, res) => {
    res.json(await friend.deleteAllFriendsByUser(req.body.user))
}
const checkIfFriends = async (req, res) => {
    res.json(await friend.checkIfFriends(req.body.user1,req.body.user2))
}
const getFriendsOfUser = async (req,res) => {
    res.json(await friend.getFriendsOfUser(req.body.user))
}
const getLastPostOfFriends = async (req, res) => {
    res.json(await friend.getLastPostOfFriends(req.body.id))
}
module.exports = {
    createFriends, deleteFriends, deleteAllFriendsByUser, checkIfFriends, getFriendsOfUser, getLastPostOfFriends
}
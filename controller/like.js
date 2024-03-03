const like = require("../services/like.js");

const addLike = async (req, res) => {
    await like.addLike(req.body.userId,req.body.postId)
    res.json(await like.getLikeAmount(req.body.postId));
}
const removeLike = async (req, res) => {
    await like.removeLike(req.params.userId,req.params.postId)
    res.json(await like.getLikeAmount(req.body.postId));
}

const removeLikesByUser = async (req,res) => {
    res.json(await like.removeLikesByUser(req.params.userId))
}
const checkIfLike = async (req, res) => {
    res.json(await like.checkIfLike(req.body.userId, req.body.postId))
}
const getLikeAmount = async (req,res) => {
    res.json(await like.getLikeAmount(req.body.user))
}

module.exports = {
    addLike, removeLike,removeLikesByUser, checkIfLike, getLikeAmount
}
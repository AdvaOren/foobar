const like = require("../services/like.js");

const addLike = async (req, res) => {
    res.json(await like.addLike(req.body.userId,req.body.postId));
}
const removeLike = async (req, res) => {
    res.json(await like.removeLike(req.params.userId,req.params.posrId));
}
const removeLikesByPost = async (req,res) => {
    res.json(await like.removeLikesByPost(req.params.postId))
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
    addLike, removeLike, removeLikesByPost,removeLikesByUser, checkIfLike, getLikeAmount
}
const like = require("../services/like.js");

const handleLike = async (req, res) => {
    const isLiked = like.checkIfLike(req.body.userId, req.body.postId)
    //if post is liked by user than remove like else add like
    if (isLiked) {
        await like.removeLike(req.body.userId, req.body.postId);
    } else {
        await like.addLike(req.body.userId, req.body.postId)
    }
    res.json(await like.getLikeAmount(req.body.postId));
}
const removeLike = async (req, res) => {
    await like.removeLike(req.params.userId, req.params.postId)
    res.json(await like.getLikeAmount(req.body.postId));
}

const removeLikesByUser = async (req, res) => {
    res.json(await like.removeLikesByUser(req.params.userId))
}
const checkIfLike = async (req, res) => {
    res.json(await like.checkIfLike(req.body.userId, req.body.postId))
}
const getLikeAmount = async (req, res) => {
    res.json(await like.getLikeAmount(req.body.user))
}

module.exports = {
    handleLike, removeLike, removeLikesByUser, checkIfLike, getLikeAmount
}
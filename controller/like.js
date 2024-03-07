const like = require("../services/like.js");

const handleLike = async (req, res) => {
    const isLiked = await like.checkIfLike(req.params.id, req.params.pid)
    //if post is liked by user than remove like else add like
    if (isLiked) {
        await like.removeLike(req.params.id, req.params.pid);
    } else {
        await like.addLike(req.params.id, req.params.pid)
    }
    const amount = await like.getLikeAmount(req.params.pid)
    res.json({amount: amount});
}

const removeLike = async (req, res) => {
    await like.removeLike(req.params.id, req.params.pid)
    res.json(await like.getLikeAmount(req.params.pid));
}

const removeLikesByUser = async (req, res) => {
    res.json(await like.removeLikesByUser(req.params.id))
}
const checkIfLike = async (req, res) => {
    res.json(await like.checkIfLike(req.params.id, req.params.pid))
}
const getLikeAmount = async (req, res) => {
    res.json(await like.getLikeAmount(req.params.pid))
}

module.exports = {
    handleLike, removeLike, removeLikesByUser, checkIfLike, getLikeAmount
}
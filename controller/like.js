const like = require("../services/like.js");

const handleLike = async (req, res) => {
    console.log("in cont: ", req.body);
    const isLiked = like.checkIfLike(req.params.id, req.pid)
    //if post is liked by user than remove like else add like
    if (isLiked) {
        await like.removeLike(req.params.id, req.params.pid);
    } else {
        await like.addLike(req.params.id, req.params.pid)
    }
    console.log("params id: ", req.params.id, " params pid: ", req.params.pid)
    const amount = await like.getLikeAmount(req.params.postId)
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
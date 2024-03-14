const like = require("../services/like.js");

/*
* name:handleLike
* action gives request of handleLike to like service
* response: json objects that describes like amount on liked post
* */
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

/*
* name:removeLike
* action gives request of removeLike to like service
* response: json objects that describes deleted like
* */
const removeLike = async (req, res) => {
    await like.removeLike(req.params.id, req.params.pid)
    res.json(await like.getLikeAmount(req.params.pid));
}

/*
* name:removeLikesByUser
* action gives request of removeLikesByUser to like service
* response: json objects that describes deleted like
* */
const removeLikesByUser = async (req, res) => {
    res.json(await like.removeLikesByUser(req.params.id))
}

/*
* name:checkIfLike
* action gives request of checkIfLike to like service
* response: json objects that describes if post is liked by user
* */
const checkIfLike = async (req, res) => {
    res.json(await like.checkIfLike(req.params.id, req.params.pid))
}

/*
* name:getLikeAmount
* action gives request of getLikeAmount to like service
* response: json objects that describes amount of likes on post
* */
const getLikeAmount = async (req, res) => {
    res.json(await like.getLikeAmount(req.params.pid))
}



module.exports = {
    handleLike, removeLike, removeLikesByUser, checkIfLike, getLikeAmount
}
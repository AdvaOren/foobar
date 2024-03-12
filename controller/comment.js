const comment = require("../services/comment.js");
/*
* name:create comment
* action gives request of create comment to comment service
* */
const createComment = async (req, res) => {
    res.json(await comment.createComment(req.body.text, req.params.pid, req.params.id))
}

/*
* name:getCommentsByUser
* action gives request of getCommentsByUser to comment service
* */
const getCommentsByUser = async (req, res) => {
    const comments = await comment.getCommentsByUser(req.params.id)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}

/*
* name:getCommentsByPost
* action gives request of getCommentsByPost to comment service
* */
const getCommentsByPost = async (req, res) => {
    const comments = await comment.getCommentsByPost(req.params.pid)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}
/*
* name:getCommentsByPostAndUser
* action gives request of getCommentsByPostAndUser to comment service
* */
const getCommentsByPostAndUser = async (req, res) => {
    const comments = await comment.getCommentsByPostAndUser(req.params.pid, req.params.id)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}
/*
* name:getCommentById
* action gives request of getCommentById to comment service
* */
const getCommentById = async (req, res) => {
    const find = await comment.getCommentById(req.params.id)
    if (!find) {
        return res.status(404).json({errors: ['Comment not found']});
    }
    res.json(find)
}
/*
* name:updateComment
* action gives request of updateComment to comment service
* */
const updateComment = async (req, res) => {
    const find = await comment.updateComment(req.params.cid, req.body.text);
    if (!find) {
        return res.status(404).json({errors: ['Comment not found']});
    }
    res.json(find);
}
/*
* name:deleteCommentById
* action gives request of deleteCommentById to comment service
* */
const deleteCommentById = async (req, res) => {
    res.json(await comment.deleteCommentById(req.params.cid));
}
/*
* name:deleteCommentsByPost
* action gives request of deleteCommentsByPost to comment service
* */
const deleteCommentsByPost = async (req, res) => {
    return await comment.deleteCommentsByPost(req.params.pid);
}
/*
* name:deleteCommentsByUser
* action gives request of deleteCommentsByUser to comment service
* */
const deleteCommentsByUser = async (req, res) => {
    return await comment.deleteCommentsByUser(req.params.id);
}

module.exports = {
    createComment,
    getCommentsByUser,
    getCommentsByPost,
    getCommentsByPostAndUser,
    getCommentById,
    deleteCommentsByUser,
    deleteCommentsByPost,
    deleteCommentById,
    updateComment
};


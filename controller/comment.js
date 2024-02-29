const comment = require("../services/comment.js");

const createComment = async (req, res) => {
    res.json(await comment.createComment(req.body.text, req.body.postId, req.body.userId))
}
const getCommentsByUser = async (req, res) => {
    const comments = await comment.getCommentsByUser(req.query.userId)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}
const getCommentsByPost = async (req, res) => {
    const comments = await comment.getCommentsByPost(req.query.postId)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}
const getCommentsByPostAndUser = async (req, res) => {
    const comments = await comment.getCommentsByPostAndUser(req.query.postId, req.query.userId)
    if (!comments) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(comments)
}
const getCommentById = async (req, res) => {
    const find = await comment.getCommentById(req.query.id)
    if (!find) {
        return res.status(404).json({errors: ['Comment not found']});
    }
    res.json(find)
}
const updateComment = async (req, res) => {
    const find = await comment.updateComment(req.params.id, req.params.text);
    if (!find) {
        return res.status(404).json({errors: ['Comment not found']});
    }
    res.json(find);
}
const deleteCommentById = async (req, res) => {
    return  await comment.deleteCommentById(req.params.id);
}
const deleteCommentsByPost = async (req, res) => {
     return  await comment.deleteCommentsByPost(req.params.postId);
}
const deleteCommentsByUser = async (req, res) => {
    return  await comment.deleteCommentsByUser(req.params.userId);
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


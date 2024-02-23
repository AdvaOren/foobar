const comment = require("../services/comment.js");

const createComment = async (req, res) => {
    res.json(await comment.createComment(req.body.text, req.body.postId,req.body.userId))
}
const getCommentsByUser = async (req,res) => {
    res.json(await comment.getCommentsByUser(req.body.userId))
}
const getCommentsByPost = async (req, res) => {
    res.json(await comment.getCommentsByPost(req.body.postId))
}
const getCommentsByPostAndUser = async (req, res) => {
    res.json(await comment.getCommentsByPostAndUser(req.body.postId,req.body.userId))
}
const getCommentById = async (req,res) => {
    res.json(await comment.getCommentsById(req.body.id))
}
const updateComment = async (req, res) => {
    res.json(await comment.updateComment(req.body.id,req.body.text))
}
const deleteCommentById = async (req,res) => {
    res.json(await comment.deletecommentById(req.body.id))
}
const deleteCommentsByPost = async (req, res) => {
    res.json(await comment.deletecommentByPost(req.body.postId))
}
const deleteCommentsByUser = async (req, res) => {
    res.json(await comment.deletecommentByUser(req.body.userId))
}
module.exports = {
    createComment,
    getCommentsByUser,
    getCommentsByPost,
    getCommentsByPostAndUser,
    deleteCommentsByUser,
    deleteCommentsByPost,
    deleteCommentById,
    updateComment
};


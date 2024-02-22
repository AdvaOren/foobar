const Comment = require('../models/Comment');


const createComment = async (text, postId, userId) => {
    const comment = new Comment({
        text: text, postId: postId, userId: userId});
    return await comment.save();
};


const getCommentsByUser = async (userId) => {
    return await Comment.find({userId: userId});
};

const getCommentsByPost = async (postId) => {
    return await Comment.find({postId: postId});
};

const getCommentsByPostAndUser = async (postId, userId) => {
    return await Comment.find({postId: postId, userId: userId});
};

const getCommentById = async (id) => {
    return await Comment.findById(id);
};

const updateComment = async (id, text) => {
    const comment = await getCommentById(id);
    if (!comment) return null;
    comment.text = text;
    await comment.save();
    return comment;
};

const deleteCommentById = async (id) => {
    const comment = await getCommentById(id);
    if (!comment) return null;
    await comment.remove();
    return comment;
};

const deleteCommentsByPost = async (postId) => {
    Comment.deleteMany({postId:postId})
    return null;
};


const deleteCommentsByUser = async (userId) => {
    Comment.deleteMany({userId:userId})
    return null;
};



module.exports = {createComment, getCommentByUser: getCommentsByUser, getCommentsByPost, getCommentsByPostAndUser,
    deleteCommnetsByUser: deleteCommentsByUser, deleteCommnetsByPost: deleteCommentsByPost, deleteCommnetById: deleteCommentById,updateComment}
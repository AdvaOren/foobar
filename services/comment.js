const Comment = require('../models/Comment');
const User = require('./user')

/**
 * Creates a new comment.
 *
 * @param {string} text - The text of the comment.
 * @param {string} postId - The ID of the post the comment belongs to.
 * @param {string} userId - The ID of the user who made the comment.
 * @returns {Promise} A Promise that resolves to the created comment.
 */
const createComment = async (text, postId, userId) => {
    const comment = new Comment({
        text: text, postId: postId, userId: userId});
    return await comment.save();
};

/**
 * Retrieves comments made by a user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A Promise that resolves to an array of comments made by the user.
 */
const getCommentsByUser = async (userId) => {
    return await Comment.find({userId: userId}).sort({date: -1}).lean();
};

/**
 * Retrieves comments associated with a post.
 *
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to an array of comments associated with the post.
 */
const getCommentsByPost = async (postId) => {
    const comments =  await Comment.find({postId: postId}).sort({date: -1}).lean();
    const commentsMembers = [];
    for (const comment of comments) {
        const user = await User.getUserById(comment.userId);
        const commentData = {_id:comment._id,text:comment.text};
        commentsMembers.push({"first":commentData,"second":user});
    }
    return commentsMembers;
};

/**
 * Retrieves comments associated with a post made by a specific user.
 *
 * @param {string} postId - The ID of the post.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A Promise that resolves to an array of comments associated with the post and user.
 */
const getCommentsByPostAndUser = async (postId, userId) => {
    return await Comment.find({postId: postId, userId: userId}).sort({date: 1}).lean();
};

/**
 * Retrieves a comment by its ID.
 *
 * @param {string} id - The ID of the comment.
 * @returns {Promise} A Promise that resolves to the comment with the specified ID.
 */
const getCommentById = async (id) => {
    if (id.length !== 24) return null;
    return await Comment.findById(id).lean();
};

/**
 * Updates the text of a comment.
 *
 * @param {string} id - The ID of the comment.
 * @param {string} text - The new text of the comment.
 * @returns {Promise} A Promise that resolves to the updated comment or null if comment not found.
 */
const updateComment = async (id, text) => {
    const comment = await getCommentById(id);
    if (!comment) return null;
    comment.text = text;
    await comment.save();
    return comment;
};

/**
 * Deletes a comment by its ID.
 *
 * @param {string} id - The ID of the comment.
 * @returns {Promise} A Promise that resolves to the deleted comment or null if comment not found.
 */
const deleteCommentById = async (id) => {
    const comment = await getCommentById(id);
    if (!comment) return null;
    await comment.remove();
    return comment;
};

/**
 * Deletes all comments associated with a post.
 *
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to null.
 */
const deleteCommentsByPost = async (postId) => {
    await Comment.deleteMany({postId: postId});
    return null;
};

/**
 * Deletes all comments made by a user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A Promise that resolves to null.
 */
const deleteCommentsByUser = async (userId) => {
    await Comment.deleteMany({userId: userId});
    return null;
};

const getCommentsAmount = async (postId) => {
    const comments = await getCommentsByPost(postId)
    return comments.length
}

module.exports = {
    createComment,
    getCommentsByUser,
    getCommentsByPost,
    getCommentsByPostAndUser,
    deleteCommentsByUser,
    deleteCommentsByPost,
    deleteCommentById,
    updateComment,
    getCommentsAmount,
    getCommentById
};

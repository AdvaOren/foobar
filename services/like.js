const Like = require('../models/Like');

/**
 * Adds a like to a post.
 *
 * @param {string} userId - The ID of the user who liked the post.
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to the created like.
 */
const addLike = async (userId, postId) => {
    const newLike = new Like({
        userId: userId, postId: postId
    });
    return await newLike.save();
};

/**
 * Removes a like from a post.
 *
 * @param {string} userId - The ID of the user who liked the post.
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to null.
 */
const removeLike = async (userId, postId) => {
    await Like.deleteOne({userId: userId, postId: postId});
    return null;
};

/**
 * Removes all likes from a post.
 *
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to null.
 */
const removeLikesByPost = async (postId) => {
    await Like.deleteMany({postId: postId});
    return null;
};

/**
 * Removes all likes by a user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A Promise that resolves to null.
 */
const removeLikesByUser = async (userId) => {
    await Like.deleteMany({userId: userId});
    return null;
};

/**
 * Checks if a user has liked a post.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} postId - The ID of the post.
 * @returns {Promise} A Promise that resolves to a boolean indicating whether the user has liked the post or not.
 */
const checkIfLike = async (userId, postId) => {
    const like = await Like.findOne({userId: userId, postId: postId});
    if (!like) {
        return false;
    }
    return true;
};

/**
 * Retrieves the amount of likes by a user.
 *
 * @param {string} postId - The ID of the user.
 * @returns {Promise} A Promise that resolves to the number of likes.
 */
const getLikeAmount = async (postId) => {
    const likes = await Like.find({postId: postId});
    return {likes: likes.length};
};

module.exports = {
    addLike,
    removeLike,
    removeLikesByPost,
    removeLikesByUser,
    checkIfLike,
    getLikeAmount
};

const Post = require('../models/post');
const fServices = require('../services/friend');

/**
 * Creates a new post.
 *
 * @param {string} content - The content of the post.
 * @param {buffer} img - The image attached to the post.
 * @param {string} userId - The ID of the user who created the post.
 * @param {Date} [date] - Optional. The date of the post.
 * @returns {Promise} A Promise that resolves to the created post.
 */
const createPost = async (content, img, userId, date) => {
    const post = new Post({
        content: content, img: img, userId: userId
    });
    if (date)
        post.date = date;
    return await post.save();
};

/**
 * Retrieves a post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise} A Promise that resolves to the post with the specified ID.
 */
const getPostById = async (id) => {
    if (id.length !== 24) return null;
    return await Post.findById(id).lean();
};

/**
 * Retrieves all posts of a specific user.
 *
 * @returns {Promise} A Promise that resolves to an array of all posts of user.
 */
const getPostsByUser = async (userId) => {
    return await Post.find({userId: userId}).lean();
};

/**
 * Updates the content of a post.
 *
 * @param {string} id - The ID of the post.
 * @param {string} content - The new content of the post.
 * @returns {Promise} A Promise that resolves to the updated post or null if post not found.
 */
const updatePostContent = async (id, content) => {
    const post = await getPostById(id);
    if (!post) return null;
    post.content = content;
    await post.save();
    return post;
};

/**
 * Updates the image of a post.
 *
 * @param {string} id - The ID of the post.
 * @param {buffer} img - The image.
 * @returns {Promise} A Promise that resolves to the updated post or null if post not found.
 */
const updatePostImg = async (id, img) => {
    const post = await getPostById(id);
    if (!post) return null;
    post.img = img;
    await post.save();
    return post;
};

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise} A Promise that resolves to the deleted post or null if post not found.
 */
const deletePost = async (id) => {
    const post = await getPostById(id);
    if (!post) return null;
    await post.remove();
    return post;
};

/**
 * Retrieves the author of a post.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise} A Promise that resolves to an object containing the ID of the post's author.
 */
const getAuthor = async (id) => {
    const post = await getPostById(id);
    if (!post) return null;
    return {userId: post.userId}.lean();
};

/**
 * Retrieves the last five post.
 *
 * @returns {Promise} A Promise that resolves to an object containing the posts
 */
const latestFivePost = async () => {
    const friends = await fServices.getFriendsOfUser(id);
    friends.push(id);
    const postList = await Post.find({userId:{"$nin":friends}})
        .sort({date: -1}).limit(5).lean()
    return postList.lean();
}



module.exports = {
    createPost,
    getPostById,
    getPostsByUser,
    updatePostContent,
    updatePostImg,
    deletePost,
    getAuthor,
    latestFivePost
};

const Post = require('../models/Post');
const fServices = require('../services/friend');
const User = require('./user');
const Like = require('./like');
const Comment = require('./comment');
const BloomFilter = require('../bloom_filter/socket');



/**
 * Creates a new post.
 *
 * @param {string} content - The content of the post.
 * @param {buffer} img - The image attached to the post.
 * @param {string} userId - The ID of the user who created the post.
 * @param {String} [date] - Optional. The date of the post.
 * @returns {Promise} A Promise that resolves to the created post.
 */
const createPost = async (content, img, userId, date) => {
    const valid = await BloomFilter.checkBlackListed(content)
    if (valid === false) {
        return null;
    }

    // Extract the image data from the Base64 string
    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');

    // Convert the Base64 data to a Buffer
    const imageData = Buffer.from(base64Data, 'base64');
    if (date === undefined)
        date = new Date().toISOString();

    const post = new Post({
        content: content, img: imageData, userId: userId, date: date
    });

    const savedPost = await post.save();
    return savedPost.toObject();
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
const getPostsByUser = async (id,requester) => {
    const areFriends = await fServices.checkIfFriends(requester,id);
    if (!areFriends && id !== requester)
        return ([])
    const temp = await Post.find({userId: id}).sort({date: -1}).lean();
    const posts = [];
    for (const post of temp) {
        const likeAmount = await Like.getLikeAmount(post._id);
        const isLiked = await Like.checkIfLike(requester, post._id);
        const commentsAmount = await Comment.getCommentsAmount(post._id);
        const postInfo = { "likeAmount": likeAmount.likes, "isLiked": isLiked, "postId": post._id.toString(), "commentsAmount": commentsAmount, "userId": id };
        posts.push({ "first": post, "second": postInfo })
    }
    return posts;
};

/**
 * Updates the content of a post.
 *
 * @param {string} id - The ID of the post.
 * @param {string} content - The new content of the post.
 * @returns {Promise} A Promise that resolves to the updated post or null if post not found.
 */
const updatePostContent = async (id, content) => {
    const valid = await BloomFilter.checkBlackListed(content)
    if (valid === false) {
        return null;
    }
    return await Post.findOneAndUpdate({ _id: id }, { content: content }, { new: true }).lean();
};

/**
 * Updates the image of a post.
 *
 * @param {string} id - The ID of the post.
 * @param {buffer} img - The image.
 * @returns {Promise} A Promise that resolves to the updated post or null if post not found.
 */
const updatePostImg = async (id, img) => {
    // Extract the image data from the Base64 string
    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');

    // Convert the Base64 data to a Buffer
    const imageData = Buffer.from(base64Data, 'base64');
    return await Post.findOneAndUpdate({ _id: id }, { img: imageData }, { new: true }).lean();

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
    await Post.deleteOne({ _id: id });
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
    return { userId: post.userId };
};

/**
 * Retrieves the last five post.
 *
 * @returns {Promise} A Promise that resolves to an object containing the posts
 */
const latestFivePost = async (id) => {
    const friends = await fServices.getFriendsOfUserId(id);
    friends.push(id);
    const postList = await Post.find({ userId: { "$nin": friends } })
        .sort({ date: -1 }).limit(5).lean()
    const postsMembers = [];
    for (const post of postList) {
        const member = await User.getUserById(post.userId);
        const likeAmount = await Like.getLikeAmount(post._id);
        const isLiked = await Like.checkIfLike(id, post._id);
        const commentsAmount = await Comment.getCommentsAmount(post._id);
        const postInfo = { "likeAmount": likeAmount.likes, "isLiked": isLiked, "postId": post._id.toString(), "commentsAmount": commentsAmount, "userId": id };
        postsMembers.push({ "first": post, "second": member, "third": postInfo })
    }
    return postsMembers;
}

const deleteAllPostsByUser = async (id) => {
    await Post.deleteMany({ userId: id });
    return null;
}



module.exports = {
    deleteAllPostsByUser,
    createPost,
    getPostById,
    getPostsByUser,
    updatePostContent,
    updatePostImg,
    deletePost,
    getAuthor,
    latestFivePost
};

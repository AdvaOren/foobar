const Post = require('../models/post');


const createPost = async (content, img, userId, date) => {
    const post = new Post({
        content: content, img: img, userId: userId
    });
    if (date)
        post.date = date;
    return await post.save();
};

const getPostById = async (id) => {
    return await Post.findById(id);
};

const getPosts = async () => {
    return await Post.find({});
};

const updatePostContent = async (id, content) => {
    const post = await getPostById(id);
    if (!post) return null;
    post.content = content;
    await post.save();
    return post;
};

const updatePostImg = async (id, img) => {
    const post = await getPostById(id);
    if (!post) return null;
    post.img = img;
    await post.save();
    return post;
};

const deletePost = async (id) => {
    const post = await getPostById(id);
    if (!post) return null;
    await post.remove();
    return post;
};

const getAuthor = async (id) => {
    const post = await getPostById(id);
    if (!post) return null;
    return {userId: post.userId};
};


module.exports = {createPost, getPostById, getPosts, updatePostContent, updatePostImg,
    deletePost, getAuthor}
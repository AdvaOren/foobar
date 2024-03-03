const posts = require("../services/post.js");
const friends = require("../services/friend");
const like = require("../services/like.js");
const comment = require("../services/comment.js");
/**
 * name: createPost
 * action: creates post
 * **/
const createPost = async (req, res) => {
    res.json(await posts.createPost(req.body.content, req.body.img, req.body.userId, req.body.date));
}
/**
 * name:getPostById
 * action: returns single post by its id
 * */
const getPostById = async (req, res) => {
    res.json(await posts.getPostById(req.query.id))
}
/**
 * name:getPostsByUser
 * action: returns all posts of user
 * */
const getPostsByUser = async (req, res) => {
    res.json(await posts.getPostsByUser(req.query.userId))
}
const updatePostContent = async (req, res) => {
    res.json(await posts.updatePostContent(req.params.id, req.params.content))
}
const updatePostImg = async (req, res) => {
    res.json(await posts.updatePostImg(req.params.id, req.params.img))
}
const getAuthor = async (req, res) => {
    res.json(await posts.getAuthor(req.query.id))
}

/**
 * func name: get25posts
 * action: returns 20 latests posts of friends and 5 latests posts in general
 * */
const get25Posts = async (req, res) => {
    var list = await posts.latestFivePost();
    list.concat(await friends.getLastPostOfFriends());
    res.json(list);

}
/**
 * func name: deletePost
 * action: delete post and its likes and comments.
 * **/
const deletePost = async (req, res) => {
    const postAuthor = await posts.getAuthor(req.params.postId)
    if (req.params.id !== postAuthor.id) {
        return res.status(500).json({errors: ["unable to delete, user is not the author"]});
    }
    const post = posts.deletePost(req.params.postId);
    await like.removeLikesByPost(req.params.postId);
    await comment.deleteCommentsByPost(req.params.postId)
    res.json(post);
}
module.exports = {
    createPost,
    getPostById,
    getPostsByUser,
    updatePostContent,
    updatePostImg,
    deletePost,
    getAuthor,
    latestFivePost,
    get25Posts
}
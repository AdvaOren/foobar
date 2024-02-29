const posts = require("../services/post.js");
const friends = require("../services/friend");
const like = require("../services/like.js");
const comment = require("../services/comment.js");

const createPost = async (req, res) => {
    res.json(await posts.createPost(req.body.content, req.body.img, req.body.userId, req.body.date));
}
const getPostById = async (req, res) => {
    res.json(await posts.getPostById(req.query.id))
}
const getPosts = async (req, res) => {
    res.json(await posts.getPosts())
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
const latestFivePost = async (req, res) => {
    res.json(await posts.latestFivepost());
}
/**
 * func name: get25posts
 * action: returns 20 latests posts of friends and 5 latests posts in general
 * */
const get25Posts = async (req, res) => {
    var list = posts.latestFivePost();
    list.concat(friends.getLastPostOfFriends());
    res.json(list);

}
/**
 * func name: deletePost
 * action: delete post and its likes and comments.
 * **/
const deletePost = async (req, res) => {
    const post = posts.deletePost(req.params.postId);
    await like.deleteLikesByPost(req.params.postId);
    await comment.deleteCommentsByPost(req.params.postId)
    res.json(post);
}
module.exports = {
    createPost,
    getPostById,
    getPosts,
    updatePostContent,
    updatePostImg,
    deletePost,
    getAuthor,
    latestFivePost,
    get25Posts
}
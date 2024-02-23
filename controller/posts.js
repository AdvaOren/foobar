const posts = require("../services/posts.js");

const createPost = async (req, res) => {
    res.json(await posts.createPost(req.body.content, req.body.img, req.body.userId, req.body.date));
}
const getPostById = async (req, res) => {
    res.json(await posts.getPostById(req.body.id))
}
const getPosts = async (req, res) => {
    res.json(await posts.getPosts())
}
const updatePostContent = async (req, res) => {
    res.json(await posts.updatePostContent(req.body.id, req.body.content))
}
const updatePostImg = async (req, res) => {
    res.json(await posts.updatePostImg(req.body.id, req.body.img))
}
const deletePost = async (req, res) => {
    res.json(await posts.deletePost(req.body.id))
}
const getAuthor = async (req, res) => {
    res.json(await posts.getAuthor(req.body.id))
}
const latestFivePost = async (req, res) => {
    res.json(await posts.latestFivepost());
}
module.exports = {
    createPost, getPostById, getPosts, updatePostContent, updatePostImg, deletePost, getAuthor, latestFivePost
}
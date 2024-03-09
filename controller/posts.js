const posts = require("../services/post.js");
const friends = require("../services/friend");
const like = require("../services/like.js");
const comment = require("../services/comment.js");
const user = require("../services/user");
const jwt = require("jsonwebtoken");

/**
 * name: createPost
 * action: creates post
 * **/
const createPost = async (req, res) => {
    const author = await user.getUserById(req.params.id);
    const post = await posts.createPost(req.body.content, req.body.img, req.params.id, req.body.date)
    res.json({...post, name: author.firstName + " " + author.lastName, profileImage: author.img});
}
/**
 * name:getPostById
 * action: returns single post by its id
 * */
const getPostById = async (req, res) => {
    res.json(await posts.getPostById(req.params.pid))
}
/**
 * name:getPostsByUser
 * action: returns all posts of user
 * */
const getPostsByUser = async (req, res) => {
    res.json(await posts.getPostsByUser(req.params.id))
}
/**
 * name: updatePostContent
 * action: updates post id content if and only if the requester is the author.
 * **/
const updatePostContent = async (req, res) => {
    //get author of post
    const author = await posts.getAuthor(req.params.pid);
    // check if request is valid
    if (author === null || req.params.id !== author.userId) {
        return res.status(500).json({errors: ["unable to update, requester is not the author"]});
    }
    let result = {}
    if (req.body.img !== "") {
        result = await posts.updatePostImg(req.params.pid, req.body.img);
    }
    if (req.body.content !== "") {
        result = await posts.updatePostContent(req.params.pid, req.body.content)
    }
    res.json(result);
}

/**
 * name: updatePostImg
 * action: updates post id img if and only if the requester is the author.
 * **/
const updatePostImg = async (req, res) => {
    const author = await posts.getAuthor(req.params.pid);
    if (author === null || req.params.id !== author.id) {
        return res.status(500).json({errors: ["unable to update, requester is not the author"]});
    }
    res.json(await posts.updatePostImg(req.params.id, req.body.img))
}
/**
 * name: getAuthor
 * action: gets the author of post by id.
 * **/
const getAuthor = async (req, res) => {
    res.json(await posts.getAuthor(req.params.pid))
}

/**
 * func name: get25posts
 * action: returns 20 latest posts of friends and 5 latest posts in general
 * */
const get25Posts = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    // Assuming 'token' is the JWT token received from the server
    const decodedToken = jwt.decode(token);

    // Now you can access the username from the decoded token
    const userId = decodedToken.id;
    let list = await posts.latestFivePost(userId);
    list = list.concat(await friends.getLastPostOfFriends(userId));
    const chunkSize = 5; // Number of objects per chunk

    // Split the list into chunks
    const chunks = [];
    for (let i = 0; i < list.length; i += chunkSize) {
        chunks.push(list.slice(i, i + chunkSize));
    }
    if (chunks.length < req.query.page) {
        console.log(null)
        res.json(null)
    }
    else {
        const chunk = chunks[req.query.page - 1];
        console.log(chunk)
        res.json(chunk)
    }

}
/**
 * func name: deletePost
 * action: delete post and its likes and comments.
 * **/
const deletePost = async (req, res) => {
    const postAuthor = await posts.getAuthor(req.params.pid)
    if (postAuthor === null || req.params.id !== postAuthor.userId) {
        return res.status(500).json({errors: ["unable to delete, user is not the author"]});
    }
    const post = await posts.deletePost(req.params.pid);
    await like.removeLikesByPost(req.params.pid);
    await comment.deleteCommentsByPost(req.params.pid)
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
    get25Posts
}
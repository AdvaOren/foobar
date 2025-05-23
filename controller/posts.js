const posts = require("../services/post.js");
const friends = require("../services/friend");
const like = require("../services/like.js");
const comment = require("../services/comment.js");
const user = require("../services/user");

/**
 * name: createPost
 * action: creates post
 * response: json obj of post
 * **/
const createPost = async (req, res) => {
    const author = await user.getUserById(req.params.id);
    const post = await posts.createPost(req.body.content, req.body.img, req.params.id, req.body.date)
    if (post === null)
        res.status(400).send("invalid url in post content");
    else
        res.json({ ...post, name: author.firstName + " " + author.lastName, profileImage: author.img });
}
/**
 * name:getPostById
 * action: returns single post by its id
 * response: json obj of post
 * */
const getPostById = async (req, res) => {
    res.json(await posts.getPostById(req.params.pid))
}
/**
 * name:getPostsByUser
 * action: returns all posts of user
 * response: json obj of all posts of user
 * */
const getPostsByUser = async (req, res) => {
    const userPosts = await posts.getPostsByUser(req.params.id,req.id);
    if (userPosts == []) {
        return res.status(404).json({errors: ['No posts found']});
    }
    res.json(userPosts)
}
/**
 * name: updatePostContent
 * action: updates post id content if and only if the requester is the author.
 * response: json obj of updated post
 * **/
const updatePostContent = async (req, res) => {
    //get author of post
    const author = await posts.getAuthor(req.params.pid);
    // check if request is valid
    if (author === null || req.params.id !== author.userId) {
        return res.status(500).json({ errors: ["unable to update, requester is not the author"] });
    }
    let result = {}
    if (req.body.img !== "") {
        result = await posts.updatePostImg(req.params.pid, req.body.img);
    }
    if (req.body.content !== "") {
        result = await posts.updatePostContent(req.params.pid, req.body.content)
    }
    if (result === null)
        res.status(400).send("invalid url in post content");
    else
        res.json(result);
}

/**
 * name: updatePostImg
 * action: updates post id img if and only if the requester is the author.
 * response: json obj of updated post
 * **/
const updatePostImg = async (req, res) => {
    const author = await posts.getAuthor(req.params.pid);
    if (author === null || req.params.id !== author.id) {
        return res.status(500).json({ errors: ["unable to update, requester is not the author"] });
    }
    res.json(await posts.updatePostImg(req.params.id, req.body.img))
}
/**
 * name: getAuthor
 * action: gets the author of post by id.
 * response: json obj of author of post
 * **/
const getAuthor = async (req, res) => {
    res.json(await posts.getAuthor(req.params.pid))
}

/**
 * func name: get25posts
 * action: returns 20 latest posts of friends and 5 latest posts in general
 * response: json obj of list of posts
 * */
const get25Posts = async (req, res) => {
    let list = await posts.latestFivePost(req.id);
    list = list.concat(await friends.getLastPostOfFriends(req.id));
    if (list == []) {
        return res.status(404).json({errors: ['No comments found']});
    }
    res.json(list)
}
/**
 * func name: deletePost
 * action: delete post and its likes and comments.
 * response: json obj of deleted post
 * **/
const deletePost = async (req, res) => {
    const postAuthor = await posts.getAuthor(req.params.pid)
    if (postAuthor === null || req.params.id !== postAuthor.userId) {
        return res.status(500).json({ errors: ["unable to delete, user is not the author"] });
    }
    const post = await posts.deletePost(req.params.pid);
    await like.removeLikesByPost(req.params.pid);
    await comment.deleteCommentsByPost(req.params.pid)
    res.json(post);
}

/**
 * func name: deleteAllPostsByUser
 * action: deletes all post of user
 * response: json obj of posts
 * **/
const deleteAllPostsByUser = async (req,res) => {
    const post = await posts.deleteAllPostsByUser(req.params.id);
    res.json(post);
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
    get25Posts
}
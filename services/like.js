const Like = require('../models/Like');


const addLike = async (userId, postId) => {
    const like = new Like({
        userId: userId, postId: postId});
    return await like.save();
};

const removeLike = async (userId, postId) => {
    await Like.deleteOne({ userId: userId, postId: postId});
    return null;
};


const checkIfLike = async (userId, postId) => {
    const like = await Like.findOne({ userId: userId, postId: postId});
    if (!like)
        return false;
    return true;

}

const getLikeAmount = async (user) => {
    const friends =await  Like.find({
        $or: [
            { user1: user},
            { user2: user}
        ]})
    if (!friends)
        return {friends : []};
    const userFriends = [];
    friends.forEach((value) => {
        if (value.user1 === user)
            userFriends.push(value.user2);
        else
            userFriends.push(value.user1);
    })
    return userFriends;
}

module.exports = {createFriends, deleteFriends, checkIfFriends, getFriendsOfUser}
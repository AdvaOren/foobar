const Friends = require('../models/Friends');


const createFriends = async (user1, user2) => {
    const friends = new Friends({
        user1: user1, user2: user2});
    return await friends.save();
};

const deleteFriends = async (user1,user2) => {
    await Friends.deleteOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user2, user1: user1 }
        ]});
    return null;
};

const deleteAllFriendsByUser = async (user) => {
    await Friends.deleteOne({
        $or: [
            { user1: user},
            { user2: user}
        ]});
    return null;
};

const checkIfFriends = async (user1, user2) => {
    const friends = await Friends.findOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user2, user1: user1 }
        ]})
    if (!friends)
        return false;
    return true;

}

const getFriendsOfUser = async (user) => {
    const friends =await  Friends.find({
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
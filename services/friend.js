const Friends = require('../models/Friends');

/**
 * Creates a new friendship between two users.
 *
 * @param {string} user1 - The ID of the first user.
 * @param {string} user2 - The ID of the second user.
 * @returns {Promise} A Promise that resolves to the created friendship.
 */
const createFriends = async (user1, user2) => {
    const friends = new Friends({
        user1: user1, user2: user2});
    return await friends.save();
};

/**
 * Deletes a friendship between two users.
 *
 * @param {string} user1 - The ID of the first user.
 * @param {string} user2 - The ID of the second user.
 * @returns {Promise} A Promise that resolves to null.
 */
const deleteFriends = async (user1, user2) => {
    await Friends.deleteOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user2, user1: user1 }
        ]});
    return null;
};

/**
 * Deletes all friendships involving a user.
 *
 * @param {string} user - The ID of the user.
 * @returns {Promise} A Promise that resolves to null.
 */
const deleteAllFriendsByUser = async (user) => {
    await Friends.deleteMany({
        $or: [
            { user1: user },
            { user2: user }
        ]});
    return null;
};

/**
 * Checks if two users are friends.
 *
 * @param {string} user1 - The ID of the first user.
 * @param {string} user2 - The ID of the second user.
 * @returns {Promise} A Promise that resolves to a boolean indicating whether they are friends or not.
 */
const checkIfFriends = async (user1, user2) => {
    const friends = await Friends.findOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user2, user1: user1 }
        ]});
    if (!friends) return false;
    return true;
};

/**
 * Retrieves all friends of a user.
 *
 * @param {string} user - The ID of the user.
 * @returns {Promise} A Promise that resolves to an array of user IDs representing friends.
 */
const getFriendsOfUser = async (user) => {
    const friends = await Friends.find({
        $or: [
            { user1: user },
            { user2: user }
        ]});
    if (!friends)
        return {friends : []};
    const userFriends = [];
    friends.forEach((value) => {
        if (value.user1 === user)
            userFriends.push(value.user2);
        else
            userFriends.push(value.user1);
    });
    return userFriends;
};

module.exports = {createFriends, deleteFriends, deleteAllFriendsByUser, checkIfFriends, getFriendsOfUser};

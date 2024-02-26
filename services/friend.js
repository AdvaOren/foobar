const Friends = require('../models/Friends');

/**
 * Creates a new friendship between two users.
 *
 * @param {string} requester - The ID of the first user.
 * @param {string} requested - The ID of the second user.
 * @returns {Promise} A Promise that resolves to the created friendship.
 */
const createFriends = async (requester, requested) => {
    const friends = new Friends({
        requester: requester, requested: requested,status:"wait"});
    return await friends.save();
};

/**
 * Deletes a friendship between two users.
 *
 * @param {string} requester - The ID of the first user.
 * @param {string} requested - The ID of the second user.
 * @returns {Promise} A Promise that resolves to null.
 */
const deleteFriends = async (requester, requested) => {
    await Friends.deleteOne({ requester: requester, requested: requested });
    await Friends.deleteOne({ requester: requested, requested: requester });
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
            { requester: user },
            { requested: user }
        ]});
    return null;
};

/**
 * Checks if two users are friends.
 *
 * @param {string} requester - The ID of the first user.
 * @param {string} requested - The ID of the second user.
 * @returns {Promise} A Promise that resolves to a boolean indicating whether they are friends or not.
 */
const checkIfFriends = async (requester, requested) => {
    const friends = await Friends.findOne(
            { requester: requester, requested: requested, status: "approve" });
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
    const friends = await Friends.find({ requester: user , status: "approve"});
    if (!friends)
        return {friends : []};
    const userFriends = [];
    friends.forEach((value) => {
        if (value.requester === user)
            userFriends.push(value.requested);
        else
            userFriends.push(value.requested);
    });
    return userFriends;
};

/**
 *
 * @param requester the requester of the friendship
 * @param requested the requested of the friendship
 * @returns {Promise} A Promise that resolves to success of accept the frienship ot not.
 */
const acceptFriendship = async (requester, requested) => {
    const friend = await Friends.findOne({requested: requested, requester: requester, status: "wait"})
    if (!friend) return false;
    friend.status = "approve";
    const friend2 = await createFriends(requested,requester);
    friend2.status = "approve";
    await friend.save();
    await friend2.save();
    return true;
}

/**
 * Retrieves the last 20 posts for user
 *
 * @param id of user that want posts
 * @returns {Promise} A Promise that resolves to array of the 20 last post of his friends
 */
const getLastPostOfFriends = async (id) => {
    const posts = await Friends.aggregate([
        {
            $lookup: {
                from: "posts",
                let: { requester: "$requester", requested: "$requested", status: "$status" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$userId", "$$requested"] } ,
                                    { $eq: ["$$requester", id] },
                                    { $eq: ["$$status", "approve"]}
                                ]
                            }
                        }
                    }
                ],
                as: "matchedPosts"
            }
        },
        {
            $unwind: "$matchedPosts"
        },
        {
            $replaceRoot: { newRoot: "$matchedPosts" }
        }
    ]).sort({date: -1}).limit(20)
    return posts;
}


module.exports = {createFriends, deleteFriends, deleteAllFriendsByUser, checkIfFriends, acceptFriendship,
    getFriendsOfUser,
    getLastPostOfFriends,
    latestFivePost
    };

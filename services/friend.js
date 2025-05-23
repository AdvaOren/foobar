const Friends = require('../models/Friends');
const User = require("./user");
const Like = require("./like");
const Comment = require("./comment");
const {request} = require("express");

/**
 * Creates a new friendship between two users.
 *
 * @param {string} requester - The ID of the first user.
 * @param {string} requested - The ID of the second user.
 * @returns {Promise} A Promise that resolves to the created friendship.
 */
const createFriends = async (requester, requested) => {
    const friends = new Friends({
        requester: requester, requested: requested, status: "wait"
    });
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
    await Friends.deleteOne({
        $or: [
            { requester: requester, requested: requested },
            { requester: requested, requested: requester }
        ]
    });
    await Friends.deleteOne({
        $or: [
            { requester: requester, requested: requested },
            { requester: requested, requested: requester }
        ]
    });
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
        ]
    });
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
const getAskFriendsOfUser = async (user) => {
    const friends = await Friends.find({ requested: user, status: "wait" }).lean();
    if (!friends)
        return { friends: [] };
    const userFriends = [];
    for (const friend of friends){
        const name = await User.getName(friend.requester);
        userFriends.push({requester:friend.requester,requested:friend.requested,requesterName:name});
    }
    return userFriends;
};

const getFriendship = async (requester,requested) => {
    let friendship = await Friends.find({requester:requester,requested:requested}).lean();
    if (friendship.length === 0) {
        friendship = await Friends.find({requester: requested, requested: requester}).lean();
        if (friendship.length === 0)
            return {friendship: []}
        else {
            friendship[0].status = "sent";
            return friendship[0]
        }
    }
    return friendship[0];
}

/**
 * Retrieves all friends of a user.
 *
 * @param {string} user - The ID of the user.
 * @returns {Promise} A Promise that resolves to an array of user IDs representing friends.
 */
const getFriendsOfUserId = async (user) => {
    const friends = await Friends.find({ requester: user, status: "approve" }).lean();
    if (!friends)
        return [];
    const userFriends = [];
    friends.forEach((value) => {
        userFriends.push(value.requested);
    });
    return userFriends;
};

const getFriendsOfUser = async (requester,requested) => {
    const areTheyFriends = await checkIfFriends(requester,requested)
    if (!areTheyFriends && requested !== requester) {
        return [];
    }
    const friends = await Friends.find({ requester: requester, status: "approve" }).lean();
    if (!friends)
        return [];
    const userFriends = [];
    for (const friend of friends){
        const name = await User.getName(friend.requested);
        const img = await User.getImg(friend.requested);
        userFriends.push({requester: friend.requester, requested: friend.requested, requesterName: name, img: img});
    }
    return userFriends;
};

const getAllFriendsRequest = async (user) => {
    const friendsApprove = await Friends.find({ requester: user, status: "approve" }).lean();
    const friendsWait = await Friends.find({ requested: user, status: "wait" }).lean();
    if (!friendsApprove && !friendsWait)
    return { userFriends: [] };
    const userFriends = [];
    if(friendsApprove) {
        friendsApprove.forEach((value) => {
            userFriends.push({friendId: value.requested, status: "approve"});
        });
    }
    if(friendsWait){
        friendsWait.forEach((value) => {
            userFriends.push({friendId: value.requester, status: "wait"});
        });
    }
    return userFriends;
}
/**
 *
 * @param requester the requester of the friendship
 * @param requested the requested of the friendship
 * @returns {Promise} A Promise that resolves to success of accept the frienship ot not.
 */
const acceptFriendship = async (requester, requested) => {
    const friend = await Friends.findOne({ requested: requested, requester: requester, status: "wait" })
    if (!friend) return false;
    friend.status = "approve";
    const friend2 = await createFriends(requested, requester);
    friend2.status = "approve";
    await friend.save();
    await friend2.save();
    return true;
}

/**
 * Retrieves the last 20 posts for user
 *
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
                                    { $eq: ["$userId", "$$requested"] },
                                    { $eq: ["$$requester", id] },
                                    { $eq: ["$$status", "approve"] }
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
    ]).sort({ date: -1 }).limit(20)
    const postsMembers = [];
    for (const post of posts) {
        const member = await User.getUserById(post.userId);
        const likeAmount = await Like.getLikeAmount(post._id);
        const isLiked = await Like.checkIfLike(id, post._id);
        const commentsAmount = await Comment.getCommentsAmount(post._id);
        const postInfo = { "likeAmount": likeAmount.likes, "isLiked": isLiked, "postId": post._id.toString(), "commentsAmount": commentsAmount, "userId": id };
        postsMembers.push({ "first": post, "second": member, "third": postInfo })
    }
    return postsMembers;
}


module.exports = {
    createFriends, getAllFriendsRequest, deleteFriends, deleteAllFriendsByUser, checkIfFriends, acceptFriendship,
    getFriendsOfUser,
    getLastPostOfFriends,
    getAskFriendsOfUser,
    getFriendship,
    getFriendsOfUserId
};

const friend = require("../services/friend.js");
const user = require("../services/user.js");

const createFriends = async (req, res) => {
    res.json(await friend.createFriends(req.body.requesterId, req.body.requestedId))
}
const deleteFriends = async (req, res) => {
    return await friend.deleteFriends(req.params.id, req.params.fid);
}
const deleteAllFriendsByUser = async (req, res) => {
    return await friend.deleteAllFriendsByUser(req.params.user);
}
const checkIfFriends = async (req, res) => {
    res.json(await friend.checkIfFriends(req.body.user1, req.body.user2))
}
const getFriendsOfUser = async (req, res) => {
    const friendsId = await friend.getFriendsOfUser(req.params.id);
    const friendsList = await Promise.all(friendsId.map(async (friendId) => {
        return await user.getUserById(friendId);
    }));
    res.json(friendsList);
}
const getAllFriendsRequest = async (req, res) => {
    // Extract the image data from the Base64 string

    const friendsreqList= await friend.getAllFriendsRequest(req.params.id);
    const friendsList = await Promise.all(friendsreqList.map(async (friend) => {
        const friendDetails = await user.getUserById(friend.friendId);
        return {
            ...friendDetails,
            status: friend.status
        };
    }));
    res.json(friendsList);
}

const acceptFriendship =async(req,res)=>{
    res.json(await friend.acceptFriendship(req.params.fid, req.params.id))

}

const getAskFriendsOfUser = async (req,res) => {
    const asks = await friend.getAskFriendsOfUser(req.params.id);
    res.json(asks);
}

const getFriendship = async (req,res) => {
    const friendship =await friend.getFriendship(req.params.id,req.params.fid)
    res.json(friendship);
}

const getLastPostOfFriends = async (req, res) => {
    res.json(await friend.getLastPostOfFriends(req.query.id))
}
module.exports = {
    createFriends,
   acceptFriendship, getAllFriendsRequest, deleteFriends,
    deleteAllFriendsByUser,
    checkIfFriends,
    getFriendsOfUser,
    getLastPostOfFriends,
    getAskFriendsOfUser,
    getFriendship
}
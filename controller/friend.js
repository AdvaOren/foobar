const friend = require("../services/friend.js");
const user = require("../services/user.js");
const jwt = require("jsonwebtoken");

/*
* name:createFriends
* action gives request of createFriends to friend service
* response: json objects that describes new friendship
* */
const createFriends = async (req, res) => {
    //res.json(await friend.createFriends(req.body.requesterId, req.body.requestedId))
    const token = req.headers.authorization.split(" ")[1];
    // Assuming 'token' is the JWT token received from the server
    const decodedToken = jwt.decode(token);

    // Now you can access the username from the decoded token
    const userId = decodedToken.id;
    res.json(await friend.createFriends(userId, req.params.id))
}
/*
* name:deleteFriends
* action gives request of deleteFriends to friend service
* response: json objects that describes tje deleted friendship
* */
const deleteFriends = async (req, res) => {
    res.json(await friend.deleteFriends(req.params.id, req.params.fid));
}
/*
* name:deleteAllFriendsByUser
* action gives request of deleteAllFriendsByUser to friend service
* response: null
* */
const deleteAllFriendsByUser = async (req, res) => {
    return await friend.deleteAllFriendsByUser(req.params.user);
}
/*
* name:checkIfFriends
* action gives request of checkIfFriends to friend service
* response: json objects that describes if requested users are friends
* */
const checkIfFriends = async (req, res) => {
    res.json(await friend.checkIfFriends(req.body.user1, req.body.user2))
}
/*
* name:getFriendsOfUser
* action gives request of getFriendsOfUser to friend service
* response: json objects that describes list of the requested users friends
* */
const getFriendsOfUser = async (req, res) => {
    const friendsId = await friend.getFriendsOfUser(req.params.id,req.id);
    res.json(friendsId);
}
/*
* name:getAllFriendsRequest
* action gives request of getAllFriendsRequest to friend service
* response: json objects that describes list of all friend requests
* */
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
/*
* name:acceptFriendship
* action gives request of acceptFriendship to friend service
* response: json objects that describes of accepted friendship
* */
const acceptFriendship =async(req,res)=>{
    res.json(await friend.acceptFriendship(req.params.fid, req.params.id))

}
/*
* name:getAskFriendsOfUser
* action gives request of getAskFriendsOfUser to comment service
* */
const getAskFriendsOfUser = async (req,res) => {
    const asks = await friend.getAskFriendsOfUser(req.params.id);
    res.json(asks);
}
/*
* name:getFriendship
* action gives request of getFriendship to comment service
* */
const getFriendship = async (req,res) => {
    const friendship =await friend.getFriendship(req.params.id,req.params.fid)
    res.json(friendship);
}
/*
* name:getLastPostOfFriends
* action gives request of getLastPostOfFriends to comment service
* */
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
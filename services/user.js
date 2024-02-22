const User = require('../models/User');


const createUser = async (email, firstName, lastname, password, img) => {
    const user = new User({
        email: email, firstName: firstName, lastName: lastname, password: password,
        img: img});
    return await user.save();
};


const getUserByEmail = async (email) => {
    return await User.findOne({email: email});
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getEmails = async () => {
    const userArray = await User.find({});
    let emailArray = [];
    userArray.forEach((value) => {
        emailArray.push(value.email);
    });
    return {emails: emailArray};
};

const updateUser = async (id, email, firstName, lastName, password) => {
    const user = await getUserById(id);
    if (!user) return null;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    await user.save();
    return user;
};

const updateUserImg = async (id, img) => {
    const user = await getUserById(id);
    if (!user) return null;
    user.img = img;
    await user.save();
    return user;
};

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) return null;
    await user.remove();
    return user;
};

const deleteUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) return null;
    await user.remove();
    return user;
};


module.exports = {createUser, getUserByEmail, getUserById, updateUser, deleteUser, deleteUserByEmail, getEmails,
    updateUserImg}
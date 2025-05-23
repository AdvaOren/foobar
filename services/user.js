const User = require('../models/User');

/**
 * Creates a new user in the database.
 *
 * @param {string} email - The user's email.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} password - The user's password.
 * @param {buffer} img - The user's image buffer.
 * @returns {Promise} A Promise that resolves to the created user or null if email already exists.
 */
const createUser = async (email, firstName, lastName, password, img) => {
    // Check if the email already exists
    if (await getUserByEmail(email))
        return null;

    const user = new User({
        email: email, firstName: firstName, lastName: lastName, password: password,
        img: img
    });

    return await user.save();
};

/**
 * Finds a user by his email address.
 *
 * @param {string} email - The user's email.
 * @returns {Promise} A Promise that resolves to the user with the specified email.
 */
const getUserByEmail = async (email) => {
    return await User.findOne({ email: email }).lean();
};

/**
 * Finds a user by his ID.
 *
 * @param {string} id - The user's ID.
 * @returns {Promise} A Promise that resolves to the user with the specified ID.
 */
const getUserById = async (id) => {
    if (id.length !== 24)
        return null;
    return await User.findById(id).lean();
};

/**
 * Retrieves all user emails.
 *
 * @returns {Promise} A Promise that resolves to an object containing an array of user emails.
 */
const getEmails = async () => {
    const userArray = await User.find({});
    let emailArray = [];
    if (!userArray)
        return { emails: [] };
    userArray.forEach((value) => {
        emailArray.push(value.email);
    });
    return { emails: emailArray }.lean();
};

const getName = async (id) => {
    const user = await User.findById(id);
    if (user) {
        // Concatenate firstName and lastName
        return user.firstName + ' ' + user.lastName;
    } else {
        // User not found
        return null;
    }
}

const getImg = async (id) => {
    const user = await User.findById(id).lean();
    if (user) {
        return user.img
    } else {
        // User not found
        return null;
    }
}

/**
 * Updates a user's information.
 *
 * @param {string} id - The user's ID.
 * @param {string} email - The user's email.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} password - The user's password.
 * @returns {Promise} A Promise that resolves to the updated user or null if user not found.
 */
const updateUser = async (id, firstName, lastName, password) => {
    const user = await User.findOneAndUpdate(
        { _id: id }, 
        { firstName, lastName, password },
    );
    if (!user) {
        return null;
    }
    return user;
};

/**
 * Updates a user's profile image.
 *
 * @param {string} id - The user's ID.
 * @param {buffer} img - The new image.
 * @returns {Promise} A Promise that resolves to the updated user or null if user not found.
 */
const updateUserImg = async (id, img) => {
    const user = await User.findOneAndUpdate(
        { _id: id }, 
        { img },
    );
    if (!user) {
        return null;
    }
    return user;
};

/**
 * Deletes a user by his ID.
 *
 * @param {string} id - The user's ID.
 * @returns {Promise} A Promise that resolves to the deleted user or null if user not found.
 */
const deleteUser = async (id) => {
    await User.findOneAndDelete({ _id: id });
    return null;
};

/**
 * Deletes a user by his email address.
 *
 * @param {string} email - The user's email.
 * @returns {Promise} A Promise that resolves to the deleted user or null if user not found.
 */
const deleteUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) return null;
    await user.remove();
    return user;
};
/**
 * Finds if user exists by email and password
 *
 * @param {string} email - The user's email.
 * @param {string} password - the user's password
 * @returns {Promise} A Promise that resolves to the user with the specified email.
 */
const findUserEx = async (id) => {
    return await User.findOne({ _id: id }).lean();
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    deleteUserByEmail,
    getEmails,
    updateUserImg,
    findUserEx,
    getName,
    getImg
};

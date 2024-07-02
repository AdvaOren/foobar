const jwt = require("jsonwebtoken");
const key = "Some super secret key!!!!!"
const userService = require("../services/user");

/**
 * name: isLoggedIn
 * action: checks if user is logged in by token
 * response: moves to next tasks or response error
 * **/
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        let token = req.headers.authorization.split(" ")[1];
        try {
            //handle the case that the android send token and add " at the start and end
            if (token.at(0) === '"') {
                token = token.slice(1, -1);
            }
            // Verify the token is valid
            const data = jwt.verify(token, key);
            // Token validation was successful. Continue to the actual function (index)
            req.id = data["id"]
            next();

        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(403).send('Token required');
}
/**
 * name: processLogin
 * action: creates token for user login
 * response: token in json obj
 * **/
const processLogin = async (req, res) => {
    // Check credentials
    if (await userService.findUserEx(req.body.id)) {
        // Here, we will only put the *validated* username
        const data = { id: req.body.id }
        // Generate the token.
        const token = jwt.sign(data, key)
        // Return the token to the browser
        res.status(201).json({ token });
    } else
        // Incorrect username/password. The user should try again.
        res.status(404).send('Invalid username and/or password')
}
module.exports = {
    isLoggedIn, processLogin
}
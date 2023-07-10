const jwt = require('jsonwebtoken');
require('dotenv/config');

// create jwt token
const create = (username, password) => {
    return jwt.sign({ username, password }, process.env.KEY,
        {
            expiresIn: process.env.EXPIRE
        });
}

// verify jwt token
const verify = (token) => {
    try {
        return jwt.verify(token, process.env.KEY);
    } catch (error) {
        return "Invalid";
    }
}

module.exports = { create, verify };
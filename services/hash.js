// hash the given data
const crypto = require('crypto');

// encrypt data
const encrypt = async (password) => {
    return crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
}

module.exports = { encrypt };
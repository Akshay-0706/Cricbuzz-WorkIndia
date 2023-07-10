// hash the given data
const crypto = require('crypto');

// encrypt data
const encrypt = async (pin) => {
    return crypto.createHmac("sha256", process.env.SALT).update(pin).digest("hex");
}

module.exports = { encrypt };
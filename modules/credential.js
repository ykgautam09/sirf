const bcrypt = require("bcrypt")
const cryptoRandomString = require("crypto-random-string")
require('dotenv').config();


// generate user id for college 
function genUserID() {
    return cryptoRandomString({ length: 10 });
}

// generate password for college 
function genPassword() {
    return cryptoRandomString({ length: 12, type: 'ascii-printable' });
}

// generate otp for email verification 
function genOtp() {
    return cryptoRandomString({ length: 6 });
}

// generate hash with password
function genHash(pass) {
    return bcrypt.hashSync(pass, 10)
}

// validate hash with password
function checkPassword(hash, pass) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = {
    genUserID,
    genPassword,
    genOtp,
    genHash,
    checkPassword
}
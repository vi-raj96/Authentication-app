//Used to give the structure for DB col
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: String,
    otpExpires: Date
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
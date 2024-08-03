// Used to give response after api call
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const UserModel = require("../Models/User");
require('dotenv').config();


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        console.error(userModel);
        res.status(200)
            .json({
                message: "Signup successfully",
                success: true
            });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: "User not found!!", success: false });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.SenderMail,
              pass: process.env.SenderMailPass
            }
          });
      
          const mailOptions = {
            from: process.env.SenderMail,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ success: false, message: 'Error sending email' });
            }
            res.status(200).json({ success: true, message: 'OTP sent to email' });
          });
        } catch (err) {
          res.status(500).json({ success: false, message: err.message });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
        res.status(200).json({ success: true, message: 'OTP verified' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
        const newPassword = await bcrypt.hash(password, 10);
        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(200).json({ success: true, message: 'Password reset successful'});
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
}

module.exports = {
    signup,
    login,
    forgotpassword,
    verifyOTP,
    resetPassword
}

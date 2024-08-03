const { signup, login, forgotpassword, verifyOTP, resetPassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotpasswordValidation, verifyOTPValidation, resetPasswordValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/forgot-password', forgotpasswordValidation, forgotpassword);
router.post('/verify-otp', verifyOTPValidation, verifyOTP);
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;
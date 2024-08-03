const jwt = require("jsonwebtoken");
require('dotenv').config();

const ensureAuthenticated = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if(!authToken){
        res.status(403).json({
            message : "Unauthorized, Token is required"
        })
    }
    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;
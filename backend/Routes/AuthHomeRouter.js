const ensureAuthenticated = require("../Middlewares/EnsureAuth");

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req,res) =>{
   console.log("User Data",req.user);
   res.status(200).json(
        {
            Message : "Signup successfully",
            success : true
        }
   )
});


module.exports = router;
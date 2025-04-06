const express=require('express');
const router = express.Router();
const User=require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport=require("passport");
const { saveRedirectUrl } = require('../middleware.js');



let userController=require("../controllers/users.js")

//* get signup forme ,//* signup route 
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup))


//* login 
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}), userController.login )



//* log out route 
router.get("/logout",userController.logout);

module.exports=router;

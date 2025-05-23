const User=require("../models/user.js");

//* signup form 

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
    }


    //* signup post form 
module.exports.signup=async(req,res)=>{

    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
    
       const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);

    //* here i implement user automatically loginn after signup 
    req.login(registeredUser,(err)=>{
if(err){
    return next(err);
}
req.flash("success","welcome to SaharaStay")
 res.redirect("/listings");
    })

  
    }
    catch(err){
req.flash("error",err.message);
res.redirect("/signup")
    }
  
};


//* login form
module.exports.renderLoginForm=(req,res)=>{

    res.render("users/login.ejs")


}


module.exports.login= async(req,res)=>{

    req.flash("success","welcome back to SaharaStay");
    
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    
    res.redirect(redirectUrl); //* here i implement post-loign page means jo path access kran chae wahi pa jaye na ki listing path pai 
    
    
    
    }



    //* logout route 
    module.exports.logout=(req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","you are logged out ");
            res.redirect("/listings");
        })
    };

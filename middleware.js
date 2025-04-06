const Listing=require("./models/listing")
let ExpressError=require("./utils/ExpressError")
const {listingSchema}=require("./schemajoi.js");
const {reviewSchema}=require("./schemajoi.js"); //* here i requie reviewSchema 
let Review=require("./models/review.js")
module.exports.isLoggedIn=(req,res,next)=>{

    if(!req.isAuthenticated()){

        req.session.redirectUrl=req.originalUrl
        req.flash("error","you must be logged in to create listing ")
       return  res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}



//* here i create authorization middleware 
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing = await  Listing.findById(id);
   console.log(res.locals);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing ");
       return  res.redirect(`/listings/${id}`)
      }
      next();
}



module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await  Review.findById(reviewId);
   
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you did not create these review ");
       return  res.redirect(`/listings/${id}`)
      }
      next();
}








//*validat listing

//* yaha maine validate kia listing schema ko (server side validiation )
module.exports . validateListing=(req,res,next)=>{
  
let{error}=listingSchema.validate(req.body)

if(error){
  let errmsg=error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errmsg); 
}
else{
  next();
}

}


//* validate reviews 


module.exports.validateReview=(req,res,next)=>{
  
    let{error}=reviewSchema.validate(req.body)
    
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg); 
    }
    else{
      next();
    }
    
    }  //* now i use it in review 
  
  

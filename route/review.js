const express=require('express');
const router = express.Router({ mergeParams: true });

const ExpressError=require('../utils/ExpressError.js')
const wrapAsync=require('../utils/wrapAsync.js')   // *require kia hai  wrapAsync 
const {reviewSchema}=require("../schemajoi.js"); //* here i requie reviewSchema 
const Review=require("../models/review.js"); //* here i require review model 
const Listing=require('../models/listing.js')

const {validateReview}=require("../middleware.js");  // wo login wala isme mai define kia hai new listing create krnse se pahle login page aaye 

const {isLoggedIn,isReviewAuthor}=require("../middleware.js")
//* validarte rview ko middleware mai dalenge 


let reviewController=require("../controllers/reviews.js")


//*review route 

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));  
  //*Delete route for review 
  
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
  
  
  
  module.exports=router;
  
  
  
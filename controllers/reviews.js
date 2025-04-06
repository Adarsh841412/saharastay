const Listing=require("../models/listing")

const Review=require('../models/review')


//* review route 
module.exports.createReview=async(req,res)=>{

  
    let listing = await Listing.findById(req.params.id);  //* yaha ek problem mai jab tum req.params.id log kroage to undefined aayega that means id nhi aa rhi hai thats means yaha pai comment add nhi ho reha hai  ye islia ho rha hai becasue jo id review submit krne ke baad url me dikh rehi hai wah yah pai nhi pahuch rehi hai because jis route pai id aa reha hai /listings/:id/reviews ye route app.js mai app.usejaha review define kia hai wahi reh ja reha yah pai nhi aa reha hai so if you want ki wo id yah bhi to iske lia ek chij ka use krena padega that is mergeParams 2 no line see

    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success","New review created")
  console.log("new review saved ");
  res.redirect(`/listings/${listing._id}`);
  
  
  }

//* delete review 

module.exports.destroyReview=async(req,res)=>{
  
  let{id,reviewId}=req.params;
  console.log(req.params);
  await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewId}}); //* with help of this we delete instance of that reviw from listin also 
  await Review.findByIdAndDelete(reviewId); //* by this we delete review 
  req.flash("success","review Deleted")
  res.redirect(`/listings/${id}`)
  };
  
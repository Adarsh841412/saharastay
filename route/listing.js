const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js')   // *require kia hai  wrapAsync 
const {listingSchema}=require("../schemajoi.js");
const Listing=require('../models/listing.js')
const ExpressError=require('../utils/ExpressError.js')
const Review = require('../models/review.js'); 
const multer  = require('multer')

const {storage}=require("../cloudConfig.js"); //* here i require cloudinary storage from cloudconfig.js
const upload = multer({ storage }) //* as we know upload mai data aaata file wala so wo file aab ham cloudianry mai dal reahe hai so jo storage hai na wo requie kai hai isilia ki usme file dal sake 



const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");  // wo login wala isme mai define kia hai new listing create krnse se pahle login page aaye 
//* (raju ) here we understand  jo bhi schema kai validation define kia hai usko kaise middleware kai form mai convert kre

//* validate listign ko middlewaere mai dal dia  hai 

//* now i user MVC seee phase 3 project so all callbacks i write i controllers
let listingController=require("../controllers/listing.js")

  //*indexroute, create route
router.route("/")
.get(wrapAsync(listingController.index))   //* iske andr jo tha wrapsync mai sab controller mai llisgin.js mai gya 
 .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));



//*create new lsiting 
router.get('/new',isLoggedIn,listingController.renderNewForm)



//*show route , put req of update listing, delter route 
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//*edit route 

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//* all the callbacks of all these route are in controller listignl.js file 
















module.exports=router;
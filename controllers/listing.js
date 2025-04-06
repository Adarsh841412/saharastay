const Listing=require("../models/listing")
const Review=require('../models/review')

//* /listings route ka 
module.exports.index=async(req,res)=>{

let allListing=await Listing.find({});

res.setHeader("Content-Type", "text/html; charset=utf-8"); 
res.render('listings/index.ejs',{allListing})
}


//* new route ka

module.exports.renderNewForm=(req,res)=>{

    //*here we check usr logged in or not
    

      res.render("listings/new.ejs")
    }


    //* show route  ks

    module.exports.showListing=async(req,res)=>{
      let{id}=req.params;
       
      let Listing1=await Listing.findById({_id:id})
      .populate({
        path:"reviews",
        populate:{
        path:"author"
      },
    
    })
    .populate("owner");
      if(!Listing1){
    
        req.flash("error","Listing you requested for doesnot exist");
        return res.redirect("/listings");
      }
      console.log(Listing1);
      res.render('listings/show.ejs',{Listing1})
    }


    //* create listing 

    module.exports.createListing=async(req,res,next)=>{

      let url=req.file.path;
      let filename=req.file.filename;
      console.log(url,"...",filename);

        // let{title,description,price,image,location,country}=req.body;
        
        //* i use try catch to handle error that i read in async  error handling   but here now i use wrapAsync it is better way than try catch 
        // console.log(req.body);
        // if(!req.body.listing){
        //     throw new ExpressError(400,"Send valid data for listing ");
        //   }
        
        //* (raju ) validate schema 
         //*  here i handle error for individual field(descriptoin title,price etc because above wala  not check for indiviual field) of form for this we use one tool that is joy 
        
        
        // let result=listingSchema.validate(req.body)
        
        // if(result.error){
        //   throw new ExpressError(400,result.error);
        // }
        //* joy ko upr middleware raju mai dal dunga 
        
        
          const sampleListings = new Listing(req.body.listing)
        
        console.log(sampleListings);
          await sampleListings.save();
         sampleListings.owner=req.user._id
         sampleListings.image={url,filename};
        await sampleListings.save();
        req.flash("success","New listing created ") //* here i add flash 
          res.redirect('/listings')
        
        };

        //*render edit form 
        module.exports.renderEditForm=async (req,res)=>{
        
          let{id}=req.params;
        let listings=await  Listing.find({_id:id});
        // console.log(listings);
        if(!listings[0]){
          req.flash("error","Listing you requested for doesnot exist");
          return res.redirect("/listings");
        }


       let originalImageUrl= listings[0].image.url;
       
       originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250");
      
       res.render('listings/edit.ejs', { 
        listing: listings[0],          // Pass the full listing object
        originalImageUrl: originalImageUrl  // Pass the modified image URL
      });
        }

        //*update lsiting 

        module.exports.updateListing=async(req,res)=>{
  
            // if(!req.body.listing){
            //   throw new ExpressError(400,"send valid data for listing ");
            // }
            
            
            let {id}=req.params;
            let listing =await Listing .findByIdAndUpdate(id,{...req.body.listing});
            if(typeof req.file!="undefined"){
            let url=req.file.path;
            let filename=req.file.filename;
            listing.image={url,filename};
            await listing.save();
            }

            let updatedData=req.body.listing;
           
            // console.log(req.body);
           console.log(id);
          
          
          //* Perform the database update
          await Listing.updateOne({ _id: id }, updatedData);
          req.flash("success","Listing updated")
          res.redirect(`/listings/${id}`)
          }



          //*delete listing 

          module.exports.destroyListing=async (req, res) => {
            let { id } = req.params;
            console.log("Deleting listing with ID:", id);
            
            // First find the listing to get its reviews
            const listing = await Listing.findById(id);
            
            if (!listing) {
                req.flash("error", "Listing not found");
                return res.redirect("/listings");
            }
          
            // Delete all reviews associated with this listing
            await Review.deleteMany({ _id: { $in: listing.reviews } });
            
            // Now delete the listing itself
            await Listing.findByIdAndDelete(id);
            
            req.flash("success", "Listing Deleted");
            res.redirect("/listings");
          }
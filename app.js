if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}

require('dotenv').config()
console.log(process.env.secret)//* it gives the environeme varibale secret 


const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js')

const wrapAsync=require('./utils/wrapAsync.js')   // *require kia hai  wrapAsync 

const Joi = require('joi');  //* here i require joy 
const {listingSchema}=require("./schemajoi.js");

const {reviewSchema}=require("./schemajoi.js"); //* here i requie reviewSchema 
const Review=require("./models/review.js"); //* here i require review model 
const listingRouter=require("./route/listing.js")  //*  express router require kia listings ke liam 
const reviewRouter=require("./route/review.js")//* reviews ke lia express router 
const userRouter=require("./route/user.js")  //* p ka hi part hai i require user that i define in route

const  session = require('express-session') //* 1 here i require session  (phle walo ke lia maine numberin nhi ki yahi se start kr reha hu sorry adarsh)

const MongoStore = require('connect-mongo'); //* to use mongosession i require it  

const flash = require('connect-flash');  //* 9 here i require flash for message poping 


const passport=require("passport")   //* p1 passport require kia 
const LocalStrategy=require("passport-local")//*p2
const User=require("./models/user.js") //* p3




// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use EJS-Mate for layout support
app.engine('ejs', ejsMate);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Override HTTP methods with the query value of "_method"
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// create basic stup of mongoose 
const mongoose = require('mongoose');
const Listing=require('./models/listing.js')


const dbUrl=process.env.ATLASDB_URL;









main()
.then((res)=>{
    console.log('sample was saved');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




//* initially ye demo ke lia banta tha date dalne ke liat 
// app.get('/testListing',async (req,res)=>{


//   let sampleListings=new Listing({
//     title:"My new villa",
//     description:"By the beach",
// price:1200,
// location:"Calangute,Goa",
// country:"India",
//   })

//   await sampleListings.save();
//   res.send("successful testing ");
// });





//* validate reveiw (server side validation )

const validateReview=(req,res,next)=>{
  
  let{error}=reviewSchema.validate(req.body)
  
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errmsg); 
  }
  else{
    next();
  }
  
  }  //* now i use it in review 


  const store=MongoStore.create({ 

    mongoUrl:dbUrl,
    crypto:{
      secret:process.env.SECRET
    },
    touchAfter:24*3600,
    
     });



     

store.on("error",()=>{
  console.log("ERROR  in MONGO SESSION STORE", err)
})

//* 2 here i define session optionn s

const seesionOptions={
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,

  cookie:{   //*4 here i add cookies in session options 
    expires:Date.now()+7*24*60*60*1000, //* 5 here i define expiry date of cookies measn ye kookie 7 din baad expire ho jayega yah pai 7 din(24 hour,60 min  60 sec and 1000 milisec)
    maxAge:7*24*60*60*1000 ,//* 6 here i define 7 days after this cookiew will expire 
    //* 7 after adding this if you go in expires option in cookies you got date of expiry of you cookie\
    httpOnly:true  //*  8 isko ham bydefault true kr dete hai iska use security purpose ke lia hota hai search crosscrypting attack to know about this 
  }
}











app.use(session(seesionOptions))   //* 3  here i use session 
app.use(flash()) //* 10  here i use flash ek chij or flash ka use nichhe wale jo listings route hai usse phle krna because jo flash hoga wo route ke help se hi use krnge to phle falsh aayega phir route khulega 

//  *11 now go to route folder and add flash in listing .js




app.use(passport.initialize()); //*p4 
app.use(passport.session()); //*p5
passport.use(new LocalStrategy(User.authenticate())) //*p6 it means passport ke andr hmne jo bhi local strategy create ki hai so hm basically keh rahe hai ki jo bhi hmra user aaye wo sare ke sare user local strategy ke through authenticate hone cahiye ans isse authenticate krne ke lia ham authenicate() method ka use kia hai  

passport.serializeUser(User.serializeUser());//*p6 //* 
passport.deserializeUser(User.deserializeUser()); //*p7 ye p6 and p7 appko milenge mogose wale passport mai  read about it in api 

//* p1 to p7 is use to implement passport and also user.js in reviews 


//*13  here i define middleware  for usign flash 
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;   
 // console.log(res.locals.success)  
  next();
})






//* p8 now we create on demo user for passport checking 
// app.get("/demouser",async(req,res)=>{

// let fakeUser=new User({
//   email:"students@gmail.com",
//   username:"delta-Students"  //* as we know in user.js in models folder we only define email not username but passport automatically takeit 
// })

// let registeredUser=await User.register(fakeUser,"helloworld")  //* register method is a static method that is used to store fakeuser and password helloword ,registar(user,password,callback) read about in static method in after clicking api in passport mongose you go in one docs where you find this  
//                                       //* and registar method automatically check krega ki user unique hai ki nhi 
// res.send(registeredUser);

// });



  app.use("/listings",listingRouter);      //* now for all the route that start with /listings it work 
  app.use("/listings/:id/reviews",reviewRouter);//* now all the route that start with /listings/:id/reviews it works 
  app.use("/",userRouter);













// //*review route 

// app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{

//   let listing = await Listing.findById(req.params.id);
//   let newReview=new Review(req.body.review);
//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();
  
// console.log("new review saved ");
// res.redirect(`/listings/${listing._id}`);


// }))
// //*Delete route for review 

// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{

// let{id,reviewId}=req.params;
// console.log(req.params);
// await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewId}}); //* with help of this we delete instance of that reviw from listin also 
// await Review.findByIdAndDelete(reviewId); //* by this we delete review 
// res.redirect(`/listings/${id}`)
// }))








 
//* jab koi bhi route match  nhi hoga to ye wla path chalega 

app.all("*",(req,res,next)=>{ 
  next(new ExpressError(404,"Page not found "))
})


//* Here i will create error handling middleware  if i not hadnle it and i fill word in price in create route not nuber then error aayega webpage pai 

// app.use((err,req,res,next)=>{
  
//   let{status,message}=err;
//   res.send("someting went wrong ")    

// })

//* 123 ye better way hai error  handle krne ka  using express class 
// app.use((err,req,res,next)=>{
  
//   let{status=500,message="Something went wrong "}=err;    //* ye default error set kia hai agr staus ar message error ka empty rehat hai to ye error aayega  


//   res.status(status).send(message);   

// })


//* ab 123 jo tha us error mai styling nhi that now i also add styling in errros 

app.use((err,req,res,next)=>{

  let{status=500,message="Something went wrong "}=err; 
  res.status(status).render("error.ejs",{err})

})




// app.get("/",(req,res)=>{
//     res.send('Hi, i am groot');
// })





app.listen(8080,()=>{
console.log('server is started ');
})
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
.then((res)=>{
    console.log('connected to db');
})
.catch(err => console.log(err));


const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:'67e9a626a933192572085652'}))
  let res=await Listing.insertMany(initData.data);
  console.log(res);
  console.log("data was initialized");
};

initDB();
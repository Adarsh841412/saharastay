const mongoose = require('mongoose');//*1
const Schema = mongoose.Schema;//*2
const passportLocalMongoose = require('passport-local-mongoose');//*3



const userSchema = new Schema({     //*passport-local-mpngoose ke andr usage mai padhan wo bolta hai ki aap jitna cahe utna field schmea mai defin kr skte but ye bydefault username and password with hash and saltvalue add kr dega so that why i only defne email here 
email:{
    type:String,
    required:true,
},

});//*4
userSchema.plugin(passportLocalMongoose);//*5  //* iske use islia kia because password or username plug in ho jaye khudse 
module.exports = mongoose.model('User', userSchema);  //*6

//* 1,2,3,4 5,6 all of these you get in serch on npm passport local mongoose and go in usage you found all of these 
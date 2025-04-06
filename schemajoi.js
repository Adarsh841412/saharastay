const Joi = require('joi');

module.exports.listingSchema = Joi.object({  //* listing schema 
  listing: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().allow("", null) // Ensures it's either empty or a valid URL
  }).required()
});


//*review schema 

module.exports. reviewSchema=Joi.object({
review:Joi.object({
rating:Joi.number().required().min(1).max(5),
comment:Joi.string().required(),

}).required()

})



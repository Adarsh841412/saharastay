//* REQUIRE KIA CLOUDINARY KO

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//* CONFIG KAI 
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

//* HERE I DEFINE STORAGE OF CLOUDINARY 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',  //* here i define cloudnary ko kon se file mai store krna hai 
      allowedFormat: ["png","jpg","jpeg"],
    
    },
  });

  module.exports={
    cloudinary,
    storage
  }

  //* now i use it in a listing .js because whai pai to apna sab hai data dalne ka server se jo aayega 
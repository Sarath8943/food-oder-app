const cloudinary = require('cloudinary');
require("dotenv").config();



    // Configuration

    cloudinary.config({ 
        cloud_name:  process.env. CLOUDINARY_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env. SECRET_API
    });


   const cloundinaryInstance = cloudinary;
module.exports = cloundinaryInstance;











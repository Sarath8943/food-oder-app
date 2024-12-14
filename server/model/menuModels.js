const mongoose = require("mongoose");

const menuSchema  = new mongoose.Schema(
    {
name: {
    type: String,
    required:true,
},
description: {
    type:String,
},
price:{
    type: Number,
    required: true,
},
category: {
    type: String,
    required:true,
},
    image: {
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s"
    },
  quantity: {
    type: Number,
    default:0,
  },
  rating: {
    type: Number,
    default:0,
  },
  restaurant: {
    type: String,
  },

  castomerreviwe: {
    type:String,
  },
  isAvailable: {
      type:Boolean,
      default:true,
  },
   
}, { timestamps: true });

module.exports = new  mongoose.model("menu", menuSchema);
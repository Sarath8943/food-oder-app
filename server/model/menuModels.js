   const mongoose = require("mongoose");
 const reviewModel = require("../model/reviewModel")
const menuSchema  = new mongoose.Schema(
    {
title: {
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
    image: {
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s"
    },
  rating: {
    type: Number,
    default:0,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },

  reviwe: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "review",
  },
   
}, { timestamps: true });

module.exports = new  mongoose.model("menu", menuSchema);
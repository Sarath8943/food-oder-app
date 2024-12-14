const  mongoose = require("mongoose")

const rewiewSchema = new mongoose.Schema({

useId: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "user",
     required: true,
},

 menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menu",
    required: true,

 },
 rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,

 },
 Comment: {
    type: String,
    trim: true,
    maxlength:500,

 },
   createdAt: {
    type: Date,
    default:Date.now
   },


}, { timestamps: true });
module.exports = new mongoose.model("reviews", reviewSchema)
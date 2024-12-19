const mongoose = require("mongoose");
const { schema } = require("../../model/orderModel");

const restaurantSchema = new schema({
  name: {
    type: string,
    required: true,
  },

  location: {
    type: string,
    required: true,
  },

  image: {
    type: string,
  },

  menuItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
    },
  ],
   
 userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],


  rating: {
    type: Number,
    min:1,
    max:5,
  }




});


const  Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant;
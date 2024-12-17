const mongoose = require("mongoose");
const { schema } = require("./userModel");



const  cartSchema = new mongoose.schema({
userId: {
    type: mongoose.Schema.type.objectd,
    ref:"users",
    required: true,
},

restaurantId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Restaurant",
  required: true,
},

menu: [
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    
 quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  Price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
],
    totalPrice: {
           type:Number,
          required:true,
         default:0,
              },
            },

            { timestamps: true });
    
module.exports = new  mongoose.model("cart", cartSchema);
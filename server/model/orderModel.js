const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({

   user : {
       type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
         required: true 
        },

  deliveryAddressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true, 
        },

 cartId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
          },

 discount: {
            type: Number,
            min: 0,
            default: 0,
          },

    totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
            default: 'Pending'
          },

        },           
    { timestamps: true });

        module.exports = mongoose.model("order", orderSchema);
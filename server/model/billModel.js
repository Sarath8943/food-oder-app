const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  
  billId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  oderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menu",
  },

  items: [
    {
      name: {
        type: string,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: { type: number, required: true },
  tax: { type: Number, 
    default: 0 },
  discount: { type: Number,
     default: 0 },
  finalAmount: { type: Number,
     required: true },
     billingDate: { type: Date,
         default: Date.now },
  paymentStatus:{
       type: string,
        enum: ['paid', 'unpaid', 'pending'],
        default: 'pending',
         },

         
}, { timestamps: true });


module.exports = mongoose.model("bill", billSchema);

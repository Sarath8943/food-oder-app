const mongoose = require("mongoose")

const  paymentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true,
     },
  orderId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "menu", 
      required: true ,
    },

  amount: {
     type: Number, 
     required: true,
     },
  paymentMethod: {
     type: String,
      required: true,
     },
  status: { 
    type: String,
     enum: ['Pending', 'Completed', 'Failed'],
      required: true ,
    },
  transactionId: { 
    type: String,
    unique: true ,
},
  createdAt: { 
    type: Date, 
    default: Date.now,
},
}, { timestamps: true });


module.exports = mongoose.model("payment", paymentSchema);
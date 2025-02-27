const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      sparse: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;

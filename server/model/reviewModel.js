const mongoose = require("mongoose");

const rewiewSchema = new mongoose.Schema(
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
      maxlength: 500,
    },
    orderId: {
      type: String,
      ref: "order",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", rewiewSchema);

module.exports = Review;

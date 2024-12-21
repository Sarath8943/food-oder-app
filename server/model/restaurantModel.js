const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI69IS84PGeSJDInvyhd8IPU8_1v3iQU0DeA&s"
  },

  menuItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
    },
  ],

  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  mobile: {
    type: Number,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

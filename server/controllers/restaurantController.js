const { default: mongoose } = require("mongoose");
const Restaurant = require("../model/restaurantModel");
const User = require("../model/userModel");

const createRestaurant = async (req, res) => {
  try {
    const { name, location, image, rating, menuItems, mobile } = req.body;
  
    const userId = req.user.id;
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(400).json({ message: " User not  found" });
    }

    const restaurantExist = await Restaurant.findOne({ name });
    if (restaurantExist) {
      return res.status(400).json({ message: " restaurant already  exist" });
    }

    const newRestaurant = new Restaurant({
      name,
      image,
      rating,
      menuItems,
      location,
      mobile,
      user: userId,
    });

    const saveRestaurant = await newRestaurant.save();
    return res.status(201).json({ message: " successfully ", saveRestaurant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allRestaurant = async (req, res) => {
  try {
    //console.log("Fetching all restaurants...");
    const restaurants = await Restaurant.find({});
    if (restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurants found" });
    }

    res
      .status(200)
      .json({ message: "Restaurants fetched successfully", restaurants });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ message: " Invalid estaurant Id" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found " });
    }

    res
      .status(200)
      .json({ message: "Restaurant fetched successfully", restaurant });
  } catch (error) {
    console.error("Error fetching restaurant", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const restaurantUpdate = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const userInput = req.body;
    console.log(restaurantId);
    // const userId = req.user.id;

    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      userInput,
      { new: true }
    );

    console.log("Found Restaurant:", restaurant);
    if (!restaurant) {
      return res.status(404).json({ error: " Restaurant  not found" });
    }

    // if (name) restaurant.name = name;
    // if (location) restaurant.location = location;
    // if (mobile) restaurant.mobile = mobile;
    // const restaurantUpdate = await restaurant.save();

    res.status(200).json({ message: " successfully", restaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);

    res.status(500).json({ message: "Internal server Error" });
  }
};

const restaurantDelete = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    // console.log(restaurantId);
    // // const userId = req.user.id;
    // if (!userId) {
    //   return res.status(404).json({ message: " User not found" });
    // }

    const deleteRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deleteRestaurant) {
      return res.status(404).json({ error: " Restaurant nof found" });
    }

    res.json({ messsage: " Account delete successfully" });
  } catch (error) {
    console.logo(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || " Internalserver Error" });
  }
};

module.exports = {
  createRestaurant,
  restaurantUpdate,
  restaurantDelete,
  allRestaurant,
  getRestaurantId,
};

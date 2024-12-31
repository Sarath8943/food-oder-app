const { default: mongoose } = require("mongoose");
const Restaurant = require("../model/restaurantModel");
const User = require("../model/userModel");
const cloundinaryInstance = require("../config/cloudinary");

const createRestaurant = async (req, res) => {
  try {
    const { name, location, image, rating, menuItems, mobile } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: " User not  found" });
    }

    const uploadResult = await cloundinaryInstance.uploader.upload(
      req.file.path
    );

    const restaurantExist = await Restaurant.findOne({ name });
    if (restaurantExist) {
      return res.status(400).json({ message: " restaurant already  exist" });
    }

    const newRestaurant = new Restaurant({
      name,
      image: uploadResult.url,
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
    
    if (req.file && req.file.path) {
      const uploadResult = await cloundinaryInstance.uploader.upload(
        req.file.path
      );
     userInput.image = uploadResult.url;
    }
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      userInput,
      { new: true }
    );
  
    if (!restaurant) {
      return res.status(404).json({ error: " Restaurant  not found" });
    }

    res.status(200).json({ message: " successfully", restaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);

    res.status(500).json({ message: "Internal server Error" });
  }
};

const restaurantDelete = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

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

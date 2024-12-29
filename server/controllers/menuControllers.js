const cloundinaryInstance = require("../config/cloudinary.js");
const Restaurant = require("../model/restaurantModel.js");
const reviewModel = require("../model/reviewModel.js");
const userModel = require("../model/userModel.js");
const Menu = require("../model/menuModels.js");



const createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { title, price, description, review, rating } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const menuItemIsExist = await Menu.findOne({
      restaurant: restaurantId,
      title: title,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item already exists" });
    }

    const newMenuItem = new Menu ({
      title,
      price,
      description,
      restaurant: restaurantId,
      review,
      rating: 0,
    });

    const savedMenuItem = await newMenuItem.save();
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.menu.push(savedMenuItem._id);
    await restaurant.save();

    res.status(201).json({
      message: "Menu Item Created and Added to Restaurant Successfully",
      savedMenuItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await menuModels
      .find()
      .populate("restaurant")
      .populate("reviwe");
    res.status(200).json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu items.", error: error.message });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await menuModels
      .findById(id)
      .populate("restaurant")
      .populate("reviwe");

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu item.", error: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, ...updates } = req.body;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update menu items." });
    }

    const updatedMenuItem = await menuModels
      .findByIdAndUpdate(id, updates, { new: true })
      .populate("restaurant")
      .populate("reviwe");

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating menu item.", error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can delete menu items." });
    }

    const deletedMenuItem = await menuModels.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting menu item.", error: error.message });
  }
};

const ReviewMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewId } = req.body;

    const menuItem = await menuModels.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    menuItem.review = reviewId;
    await menuItem.save();

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({
      message: "Error adding review to menu item.",
      error: error.message,
    });
  }
};

module.exports = {
  createMenuItem,
  getAllMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  ReviewMenuItem,
};

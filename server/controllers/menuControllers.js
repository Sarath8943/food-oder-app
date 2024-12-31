const cloundinaryInstance = require("../config/cloudinary.js");
const Restaurant = require("../model/restaurantModel.js");
const reviewModel = require("../model/reviewModel.js");
const userModel = require("../model/userModel.js");
const Menu = require("../model/menuModels.js");
const upload = require("../middlewares/multer.js");

const createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { title, price, description, review, rating, image } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const uploadResult = await cloundinaryInstance.uploader.upload(
      req.file.path
    );

    const menuItemIsExist = await Menu.findOne({
      restaurant: restaurantId,
      title: title,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item already exists" });
    }

    const newMenuItem = new Menu({
      title,
      price,
      description,
      restaurant: restaurantId,
      review,
      rating: 0,
      image: uploadResult.url,
    });

    const savedMenuItem = await newMenuItem.save();
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.menuItems.push(savedMenuItem._id);
    await restaurant.save();

    res.status(201).json({
      message: "Menu Item Created and Added to Restaurant Successfully",
      savedMenuItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const userInput = req.body;
    
    if (req.file && req.file.path) {
      const uploadResult = await cloundinaryInstance.uploader.upload(
        req.file.path
      );
      userInput.image = uploadResult.url;
    }

    const updateMenuItem = await Menu.findByIdAndUpdate(menuId, userInput, {
      new: true,
    });

    if (!updateMenuItem) {
      return res.status(404).json({ error: "MenuItem not found" });
    }

    res.status(200).json({ message: "successfully", updateMenuItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res
      .status(500)
      .json({ message: "Error updating menu item.", error: error.message });
  }
};

const getAllMenuItem = async (req, res) => {
  try {
    const allMenuItem = await Menu.find({});
    if (allMenuItem.length === 0) {
      return res.status(404).json({ error: "No menuitem found" });
    }
    res
      .status(200)
      .json({ message: "MenuItem fetched succcessfully", allMenuItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu items.", error: error.message });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuId = req.params.menuId;

    if (!menuId) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ error: "menuItem not  found" });
    }
    res
      .status(200)
      .json({ message: "menuItem feached successfully", menuItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu item.", error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;

    const deletedMenuItem = await Menu.findByIdAndDelete(menuId);

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

module.exports = {
  createMenuItem,
  getAllMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};

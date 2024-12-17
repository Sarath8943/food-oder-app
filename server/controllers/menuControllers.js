
const cloundinaryInstance = require("../config/cloudinary.js");
const menuModels = require("../model/menuModels.js");
const reviewModel = require("../model/reviewModel.js");
const review = require("../model/reviewModel.js");


const createMenuItem = async (req, res) => {
  try {
    const { title, description, price, image, restaurant, role } = req.body;

    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can create menu items." });
    }

    if (!title || !price || !restaurant) {
      return res.status(400).json({ message: "Title, price, and restaurant are required." });
    }


    console.log(req.file , '======req.file');
 const imageUrl = await cloundinaryInstance.UploadStream.upload(req.file.path)

console.log(imageUrl, "=========imageUrl");

    const newMenuItem = new Menu({title,description,price,image,restaurant,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item.", error: error.message });
  }
};


  const  getAllMenuItem = async (req, res) => {
  try {
    const menuItems = await menuModels.find().populate("restaurant").populate("reviwe");
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items.", error: error.message });
  }
};


  const  getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await menuModels.findById(id).populate("restaurant").populate("reviwe");

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item.", error: error.message });
  }
};


const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, ...updates } = req.body;


    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can update menu items." });
    }

    const updatedMenuItem = await menuModels.findByIdAndUpdate(id, updates, { new: true }).populate("restaurant").populate("reviwe");

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item.", error: error.message });
  }
};


  const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;


    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete menu items." });
    }

    const deletedMenuItem = await menuModels.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item.", error: error.message });
  }
};


  const  ReviewMenuItem = async (req, res) => {
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
    res.status(500).json({ message: "Error adding review to menu item.", error: error.message });
  }
};



module.exports = { createMenuItem, getAllMenuItem, getMenuItemById, updateMenuItem,deleteMenuItem, ReviewMenuItem  }
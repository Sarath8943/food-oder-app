
const userModel = require("../model/userModel");
const cartModel = require("../model/cartModel");

// Create Cart for a new user or get existing cart
const createCart = async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;

    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a cart already exists for the user and restaurant
    const existingCart = await cartModel.findOne({ userId, restaurantId });
    if (existingCart) {
      return res.status(200).json({ message: "Cart already exists", cart: existingCart });
    }

    // Create new cart
    const newCart = new Cart({
      userId,
      restaurantId,
      menu: [],
      totalPrice: 0,
    });

    const savedCart = await newCart.save();
    return res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { userId, restaurantId, foodId, quantity, price } = req.body;

    // Find the cart for the given user and restaurant
    const cart = await cartModel.findOne({ userId, restaurantId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Add item to cart menu
    cart.menu.push({ foodId, quantity, Price: price });

    // Update the total price
    cart.totalPrice += price * quantity;

    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update item in cart
const updateCartItem = async (req, res) => {
  try {
    const { userId, restaurantId, foodId, quantity, price } = req.body;

    // Find the cart for the given user and restaurant
    const cart = await   cartModel.findOne({ userId, restaurantId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart's menu and update it
    const menuItem = cart.menu.find(item => item.foodId.toString() === foodId);
    if (!menuItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity and price of the item
    const priceDifference = (quantity - menuItem.quantity) * price;
    menuItem.quantity = quantity;
    menuItem.Price = price;

    // Update the total price of the cart
    cart.totalPrice += priceDifference;

    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get the cart for a user
const getCart = async (req, res) => {
  try {
    const { userId, restaurantId } = req.params;

    const cart = await cartModel.findOne({ userId, restaurantId }).populate("menu.foodId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const cart = await cartModel.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(400).json({ message: "No items found in cart" });
    }
    res.status(200).json({ message: "Cart item remove successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  

module.exports = {
  createCart,
  addItemToCart,
  updateCartItem,
  getCart,
  removeCart
};

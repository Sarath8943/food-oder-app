const { model } = require("mongoose");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const Discount = require("../model/discountModel");
const userModel = require("../model/userModel");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { deliveryAddressId, cartId, discount, status } = req.body;

    let existingOrder = await Order.findOne({
      user: req.user.id,
      status: "pending",
    });
    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "You already have a pending order" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let discountValue = 0;
    if (discount) {
      const discountDoc = await Discount.findOne({ code: discount });
      if (!discountDoc) {
        return res.status(404).json({ message: "Invalid discount code" });
      }
      discountValue = discountDoc.value;
    }

    const totalPrice = cart.totalPrice - discountValue;

    const newOrder = new Order({
      user: req.user.id,
      deliveryAddressId,
      cartId,
      discount: discountValue,
      totalPrice,
      status,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order
      .find(orderId)
      .populate("user deliveryAddressId cartId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order retrieved successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAllOrder = async (req, res) => {
  try {
    const user = req.user.id;

    console.log("Received Order ID:", user);

    const orders = await Order.findOne({ user })
      .populate("user", "name email  mobile ")
      .populate("restaurent", "name location")
      .populate({
        path: "cartId",
        select: "items total price",
        populate: {
          path: "items.foodId",
          select: "name",
        },
      })
      .populate("deliveryAddressId", "street city state pincode");

    console.log("Order Found:", orders);

    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryAddressId, status, discount } = req.body;

    const order = await order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (deliveryAddressId) order.deliveryAddressId = deliveryAddressId;
    if (status) order.status = status;
    if (discount !== undefined) order.discount = discount;

    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};

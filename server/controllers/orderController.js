const { model } = require("mongoose");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const Discount = require("../model/discountModel");
const userModel = require("../model/userModel");
const restaurant = require("../model/restaurantModel");
const Address = require("../model/addressModel");

const ORDER_STATUS = ["Pending", "In Progress", "Completed", "Cancelled"];

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
    const restaurantId = cart.restaurantId;

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
      restaurantId,
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
    const order = await Order.find({ _id: orderId })
      .populate("user", "name email")
      .populate("restaurantId", "name location")
      .populate({
        path: "cartId",
        select: "items total price",
        populate: {
          path: "items.foodId",
          select: "name",
        },
      })
      .populate("deliveryAddressId", "street city state pincode")
      .populate("discount", "name code discountValue");
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

    const orders = await Order.find({ user })
      .sort({ createdAt: -1 })
      .populate("user", "name email mobile")
      .populate("restaurantId", "name location")
      .populate({
        path: "cartId",
        select: "items total price",
        populate: {
          path: "items.foodId",
          select: "name",
        },
      })
      .populate("deliveryAddressId", "street city state pincode");

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    const { discount, status, deliveryAddressId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    // Allow updating discount and deliveryAddressId
    if (discount !== undefined) order.discount = discount;
    if (deliveryAddressId) order.deliveryAddressId = deliveryAddressId;

    // Only allow users to cancel their orders
    if (userId.toString() === order.user.toString()) {
      if (status) {
        if (status === "Cancelled") {
          order.status = "Cancelled";
        } else {
          return res
            .status(400)
            .json({ message: "Users are only allowed to cancel orders." });
        }
      }
    }

    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    console.log("Fetched Order:", order);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    console.log("Current Order Status:", order.status);

    const currentIndex = ORDER_STATUS.indexOf(order.status);

    console.log("Current Index in ORDER_STATUS:", currentIndex);
    if (currentIndex === -1) {
      return res.status(400).json({ message: "Invalid order status." });
    }
    if (currentIndex === ORDER_STATUS.length - 1) {
      return res
        .status(400)
        .json({ message: "Order is already in the final state." });
    }

    order.status = ORDER_STATUS[currentIndex + 1];
    console.log("Updated Order Status:", order.status);
    await order.save();

    res.status(200).json({
      message: `Order status updated to '${order.status}'`,
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
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
  updateOrderUser,
  updateOrderStatus,
  deleteOrder,
};

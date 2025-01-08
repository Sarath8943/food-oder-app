const { model } = require("mongoose");
const order = require("../model/orderModel");


const createOrder = async (req, res) => {
    try {
      const { user, deliveryAddressId, cartId, discount, totalPrice, status } = req.body;
  
      const order = new order({
        user,
        deliveryAddressId,
        cartId,
        discount,
        totalPrice,
        status,
      });
  
      await order.save();
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getAllOrder = async (req, res) => {
    try {

      const orders = await order.find().populate("user deliveryAddressId cartId");
      
      res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {

      res.status(500).json({ message: error.message });
    }
  };
  

  const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await order.findById(id).populate("user deliveryAddressId cartId");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order retrieved successfully", order });
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
  

  module. exports = { createOrder,  getAllOrder, getOrderById, updateOrder, deleteOrder}
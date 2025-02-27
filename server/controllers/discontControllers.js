const Discount = require("../model/discountModel");
const discountModel = require("../model/discountModel");

const createDiscount = async (req, res) => {
  try {
    const { name, code, discount, value, endDate, isActive } = req.body;
    console.log("Request Body:", req.body);

    if (!name || !code || !discount || !value || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDiscount = new Discount({
      name,
      code,
      discount,
      value,
      endDate,
      isActive,
    });

    const savedDiscount = await newDiscount.save();
    res.status(201).json(savedDiscount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allDiscount = async (req, res) => {
  try {
    const discounts = await discountModel.find().sort({ createdAt: -1 });

    if (!discounts || discounts.length === 0) {
      return res.status(404).json({ message: "No discount codes available." });
    }

    res.status(200).json({
      success: true,
      count: discounts.length,
      discounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const discountById = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findById(id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found." });
    }

    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDiscount = async (req, res) => {
  try {
    const id = req.params.id || req.params.id;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid discount ID" });
    }
    const updatedDiscount = await Discount.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDiscount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json(updatedDiscount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating discount", error: error.message });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const  { id } = req.params;
    console.log("ID received:",id);

    if (!id  || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deletedDiscount = await discountModel.findByIdAndDelete(id.trim());

    if (!deletedDiscount) {
      return res.status(404).json({ message: "Discount not found." });
    }

    res.status(200).json({ message: "Discount deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDiscount,
  allDiscount,
  discountById,
  updateDiscount,
  deleteDiscount,
};

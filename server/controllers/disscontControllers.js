
const discountModel = require("../model/discountModel");

const createDiscount = async (req, res) => {
    try {
        const { code, discount, value, endDate, isActive } = req.body;


        if (!code || !discount || !value || !endDate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newDiscount = new Discount({code,discount,value,endDate,isActive });

        const savedDiscount = await newDiscount.save();
        res.status(201).json(savedDiscount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const allDiscount = async (req, res) => {
    try {
        const discounts = await discountModel.find();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const discountById = async (req, res) => {
    try {
        const { id } = req.params;
        const discount = await discountModel.findById(id);

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
        const { id } = req.params;
        const updates = req.body;

        const updatedDiscount = await discountModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedDiscount) {
            return res.status(404).json({ message: "Discount not found." });
        }

        res.status(200).json(updatedDiscount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDiscount = await discountModel.findByIdAndDelete(id);

        if (!deletedDiscount) {
            return res.status(404).json({ message: "Discount not found." });
        }

        res.status(200).json({ message: "Discount deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {createDiscount,allDiscount,discountById, updateDiscount, deleteDiscount};

const Address = require("../model/addressModel");
const User = require("../model/userModel");

// Create a new address
const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const { housename, street, city, state, pincode } = req.body;
    if (!housename || !street || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const addressexist = await Address.findOne({ housename, user: userId });
    if (addressexist) {
      return res.status(400).json({ message: "Address already exists" });
    }

    const newAddress = new Address({
      housename,
      street,
      city,
      state,
      pincode,
      user: userId,
    });

    const savedAddress = await newAddress.save();

    res
      .status(201)
      .json({ message: "Address created successfully", address: savedAddress });
  } catch (error) {
    console.error("Error in creating address:", error);
    res.status(400).json({ message: error.message });
  }
};
// Get all addresses

const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const address = await Address.find({ user: userId });
    console.log("Fetched Address:", address);

    res
      .status(200)
      .json({ message: " Alladdress fetched successfully", address });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific address by ID

const getAddressById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const addressId = req.params.addressId;

    console.log("Address ID:", addressId);

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address fetched successfully", address });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a specific address by ID
const updateAddressById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const addressId = req.params.addressId;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.houseno != null) {
      address.houseno = req.body.houseno;
    }
    if (req.body.street != null) {
      address.street = req.body.street;
    }
    if (req.body.city != null) {
      address.city = req.body.city;
    }
    if (req.body.state != null) {
      address.state = req.body.state;
    }
    if (req.body.pincode != null) {
      address.pincode = req.body.pincode;
    }

    const updatedAddress = await address.save();
    res
      .status(200)
      .json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific address by ID
const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const addressId = req.params.Id;
    console.log("Request params:", req.params); // Log all parameters
    if (!addressId) {
      return res.status(400).json({ message: "Address ID is required" });
    }

    const address = await Address.findByIdAndDelete(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    console.log("Address deleted successfully");
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllAddresses,
  createAddress,
  getAddressById,
  updateAddressById,
  deleteAddress,
}; // Added missing exports

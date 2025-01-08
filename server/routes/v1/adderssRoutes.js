const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");

const userRole = require("../../middlewares/userRole");
const {
  createAddress,
  getAllAddresses,
  updateAddressById,
  deleteAddress,
  getAddress,
  updateAddress,
} = require("../../controllers/addressController");
const router = express.Router();

router.post("/add", userAuth, userRole, createAddress);
router.get("/all", userAuth, userRole, getAllAddresses);
router.get("/:adderssid", userAuth, userRole, getAddress);
router.put("/update/:id", userAuth, userRole, updateAddress);
router.delete("/delete/:addressId", userAuth, userRole, deleteAddress);

const addressRouter = router;

module.exports = addressRouter;

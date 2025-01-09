const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");

const userRole = require("../../middlewares/userRole");
const {
  createAddress,
  getAllAddresses,
  deleteAddress,
  updateAddressById,
  getAddressById,
} = require("../../controllers/addressController");
const router = express.Router();

router.post("/add", userAuth, userRole, createAddress);
router.get("/all", userAuth, userRole, getAllAddresses);
router.get("/:addressId", userAuth, userRole, getAddressById);
router.put("/update/:addressId", userAuth, userRole, updateAddressById);
router.delete("/delete/:Id", userAuth, userRole, deleteAddress);

const addressRouter = router;

module.exports = addressRouter;

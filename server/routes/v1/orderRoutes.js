const e = require("express");
const order = require("../../model/orderModel");
const { userAuth } = require("../../middlewares/userAuth");
const {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrder,
  getOrderById,
} = require("../../controllers/orderController");
const  userRole   = require("../../middlewares/userRole")

const router = e.Router();

router.post("/ oder-create", userAuth, userRole,  createOrder);
router.get("/all-oder", getAllOrder);
router.get("/oder-Id", getOrderById);
router.put("/update-order", userAuth, updateOrder);
router.delete("/delete-order", deleteOrder);

const orderRouter = router;

module.exports = orderRouter;

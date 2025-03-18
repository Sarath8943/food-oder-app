const e = require("express");
const order = require("../../model/orderModel");
const { userAuth } = require("../../middlewares/userAuth");
const {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrder,
  getOrderById,
  updateOrderUser,
  updateOrderStatus,
} = require("../../controllers/orderController");
const userRole = require("../../middlewares/userRole");

const router = e.Router();

router.post("/create", userAuth, userRole, createOrder);
router.get("/get-all-orders", userAuth, userRole, getAllOrder);
router.get("/:orderId", userAuth, getOrderById);
router.put("/update-order/:orderId", userAuth, userRole, updateOrderUser);
router.put("/orders/:orderId/status", userAuth, userRole, updateOrderStatus);
router.delete("/delete-order", deleteOrder);

const orderRouter = router;

module.exports = orderRouter;

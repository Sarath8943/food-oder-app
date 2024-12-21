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

const router = e.Router();

router.post("/ oder-create", userAuth, createOrder);
router.get("/all-oder", getAllOrder);
router.get("/oder-id", getOrderById);
router.put("/update-order", userAuth, updateOrder);
router.delete("/delete-order", deleteOrder);

const orderRouter = router;

module.exports = orderRouter;

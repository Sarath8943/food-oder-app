const express = require("express");
const userRouter = require("./userRoutes");
const reviewRouter = require("./reviewRoutes");
const restaurantRouter = require("./restaurant");
const paymentRouter = require("./paymentRoutes");
const cartRouter = require("./cartRoutes");
const discountRouter = require("./discountRoutes");
const orderRouter = require("./orderRoutes");
const menuRouter = require("./menuRoutes");
const addressRouter = require("./addressRoutes");

const router = express.Router();

router.use("/user", userRouter);
router.use("/restaurant", restaurantRouter);
router.use("/review", reviewRouter);
router.use("/payment", paymentRouter);
router.use("/menu", menuRouter);
router.use("/discount", discountRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/address", addressRouter);
const apiRouter = router;

module.exports = apiRouter;

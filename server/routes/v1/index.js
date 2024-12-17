const { billRouter } = require('./billRoutes');
const { cartRouter } = require('./cartRoutes');
const { discountRouter } = require('./discountRoutes');
const { menuRouter } = require('./menuRoutes');
const { paymentRouter } = require('./paymentRoutes');
const reviewRouter = require('./reviewRoutes');
const userRouter = require('./userRoutes')
const v1Router = require('express').Router();


v1Router.use('/user', userRouter);
v1Router.use("/review", reviewRouter);
v1Router.use("/payment", paymentRouter);
v1Router.use("/menuitem", menuRouter );
v1Router.use("/discount", discountRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/bill", billRouter);


module.exports = v1Router;
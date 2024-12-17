const express = require('express')
const apiRouter = require('./routes/v1')
const cookieParser = require('cookie-parser')
const { PORT, connectDB } = require("./config/db");
const userRouter = require('./routes/v1/userRoutes');
const reviewRouter = require('./routes/v1/reviewRoutes');
const { paymentRouter } = require('./routes/v1/paymentRoutes');
const { menuRouter } = require('./routes/v1/menuRoutes');
const { discountRouter } = require('./routes/v1/discountRoutes');
const { cartRouter } = require('./routes/v1/cartRoutes');
const { billRouter } = require('./routes/v1/billRoutes');




const app = express();
const port = PORT;
 const db = connectDB
 db()



app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
  });

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/payment",paymentRouter);
app.use("/api/menu", menuRouter);
app.use("/api/discount", discountRouter);
app.use("/api/cart", cartRouter);
app.use("/api/bill", billRouter);

app.listen(port, () => {
    console.log(`App listening on port ${PORT}`)
})   

app.all("*",(req,res) => {
    res.status(404).json({message:"End point does not exist"})
});

const express = require("express");
const apiRouter = require("./routes/v1");
const cookieParser = require("cookie-parser");
const { PORT, connectDB } = require("./config/db");
const cors = require("cors");

const app = express();
const port = PORT;
const db = connectDB;
db();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App listening on port ${PORT}`);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "End point does not exist" });
});

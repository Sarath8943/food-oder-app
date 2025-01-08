const e = require("express");
const {
  addToCart,
  changeItemQuantity,
  removeCart,
} = require("../../controllers/cartControllers");
const { userAuth } = require("../../middlewares/userAuth");
const userRole = require("../../middlewares/userRole");

const router = e.Router();

router.post("/add", userAuth, userRole, addToCart);
router.put("/update", userAuth, changeItemQuantity);
router.delete("/delete/:foodId", userAuth, removeCart);

const cartRouter = router;

module.exports = cartRouter;

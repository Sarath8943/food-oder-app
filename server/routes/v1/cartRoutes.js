const e = require("express");
const {
  updateCartItem,
  removeCart,
  addItemToCart,
  createCart,
} = require("../../controllers/cartControllers");
const { userAuth } = require("../../middlewares/userAuth");

const router = e.Router();

router.get("/add", userAuth,  createCart);
router.post("/item", addItemToCart);
router.put("/update", updateCartItem);
router.delete("/delete", removeCart);

const cartRouter = router;

module.exports = cartRouter;

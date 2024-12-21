const e = require("express");
const { createRestaurant, restaurantUpdate, restaurantDelete } = require("../../controllers/restaurantController");
const { userAuth } = require("../../middlewares/userAuth");
const isAdmin = require("../../middlewares/adminRole");

const router = e.Router();

router.post("/create", userAuth, isAdmin, createRestaurant);
router.get("/:restaurantId");
router.get("all");
router.put("/:restaurant/update", userAuth, isAdmin, restaurantUpdate);
router.delete("/delete", userAuth,isAdmin, restaurantDelete);

const restaurantRouter = router;

module.exports = restaurantRouter;

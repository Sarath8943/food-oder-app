const e = require("express");
const { createRestaurant, restaurantUpdate, restaurantDelete, allRestaurant, getRestaurantId } = require("../../controllers/restaurantController");
const { userAuth } = require("../../middlewares/userAuth");
const isAdmin = require("../../middlewares/adminRole");

const router = e.Router();

router.post("/create", userAuth, isAdmin, createRestaurant);
router.get("/:restaurantId",getRestaurantId);
router.get("/:restaurantId/oll",allRestaurant);
router.patch("/:restaurantId/update",userAuth,isAdmin, restaurantUpdate);
router.delete("/:restaurantId/delete", userAuth,isAdmin, restaurantDelete);

const restaurantRouter = router;

module.exports = restaurantRouter;

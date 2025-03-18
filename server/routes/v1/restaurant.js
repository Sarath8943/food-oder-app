const e = require("express");
const { createRestaurant, restaurantUpdate, restaurantDelete, allRestaurant, getRestaurantId } = require("../../controllers/restaurantController");
const { userAuth } = require("../../middlewares/userAuth");
const isAdmin = require("../../middlewares/adminRole");
const upload = require("../../middlewares/multer");

const router = e.Router();

router.post("/create", userAuth,  isAdmin, upload.single("image"), createRestaurant);
router.get("/:restaurantId",getRestaurantId);
router.get("/get/all",allRestaurant);
router.put("/:restaurantId/update",userAuth,isAdmin, upload.single("image") ,restaurantUpdate);
router.delete("/:restaurantId/delete", userAuth,isAdmin, restaurantDelete);

const restaurantRouter = router;

module.exports = restaurantRouter;

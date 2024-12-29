const e = require("express");
const {
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  allMenuItem,
  getAllMenuItem,
} = require("../../controllers/menuControllers.js");
const { userAuth } = require("../../middlewares/userAuth.js");
const upload = require("../../middlewares/multer.js");
const isAdmin = require("../../middlewares/adminRole.js");
;
const router = e.Router();

router.post("/:restaurantId/create", userAuth, isAdmin, createMenuItem);
router.get("/all/:restaurantId", getAllMenuItem );
router.get("/menu/:restaurantId ", getMenuItemById);
router.put("/:restaurantId/update", userAuth, upload.single("image"), updateMenuItem);
router.delete("/delete/itemId", userAuth, deleteMenuItem);

const menuRouter = router;

module.exports = menuRouter;

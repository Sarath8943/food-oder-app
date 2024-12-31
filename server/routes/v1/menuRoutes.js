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

router.post("/:restaurantId/create", userAuth,upload.single("image"), isAdmin, createMenuItem);
router.get("/all/:restaurantId", getAllMenuItem );
router.get("/items/:menuId", getMenuItemById);
router.put("/:menuId/update", userAuth, isAdmin,upload.single("image") ,updateMenuItem);
router.delete("/menu-items/:menuId", userAuth, isAdmin, deleteMenuItem);

const menuRouter = router;

module.exports = menuRouter;

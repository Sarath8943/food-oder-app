const e = require("express");
const { createMenuItem, getAllMenuItem, getMenuItemById, updateMenuItem, deleteMenuItem } = require("../../controllers/menuControllers.js");
const { userAuth } = require("../../middlewares/userAuth.js");
const menuRouter = require("express").Router();
const upload = require("../../middlewares/multer.js")
const router = e.Router();

router.post("/creact", userAuth, upload.single('image'),createMenuItem)
router.get("/all-item",getAllMenuItem)
router.get("/title",getMenuItemById )
router.put("/update-menu", userAuth,updateMenuItem)
router.delete("/delete-menu", userAuth ,deleteMenuItem)


module.exports = { menuRouter }; 
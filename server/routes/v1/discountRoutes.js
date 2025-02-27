const e = require("express");
const {
  createDiscount,
  allDiscount,
  discountById,
  updateDiscount,
  deleteDiscount,
} = require("../../controllers/discontControllers");
const { userAuth } = require("../../middlewares/userAuth");
const isAdmin = require("../../middlewares/adminRole");

const router = e.Router();

router.post("/create",userAuth, isAdmin, createDiscount);
router.get("/all-discount",userAuth, isAdmin, allDiscount);
router.get("/discount/:id",userAuth,isAdmin, discountById);
router.put("/update/:id",userAuth,isAdmin, updateDiscount);
router.delete("/delete/:id", userAuth,isAdmin,deleteDiscount);

const discountRouter = router;

module.exports = discountRouter;

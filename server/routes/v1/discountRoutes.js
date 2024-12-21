const e = require("express");
const {
  createDiscount,
  allDiscount,
  discountById,
  updateDiscount,
  deleteDiscount,
} = require("../../controllers/disscontControllers");

const router = e.Router();

router.get("/discount-create", createDiscount);
router.get("/all-discount", allDiscount);
router.get("/discount/:id", discountById);
router.put("/update", updateDiscount);
router.delete("/ delete-discount", deleteDiscount);

const discountRouter = router;

module.exports = discountRouter;

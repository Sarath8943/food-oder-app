const e = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const {
  addReview,
  getMenuReview,
  deleteReview,
  averageRating,
} = require("../../controllers/reviewControllers");

const router = e.Router();

router.post("/add-review", userAuth, addReview);
router.delete("/delete-review/:reviewId", deleteReview);
router.get("/average-rating/:menuId ", userAuth, averageRating);

const reviewRouter = router;

module.exports = reviewRouter;

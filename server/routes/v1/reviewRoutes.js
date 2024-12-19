const  e = require('express');
const { userAuth } = require('../../middlewares/userAuth');
const { addReview, getMenuReview, deleteReview, averageRating } = require('../../controllers/reviewControllers');
const reviewRouter = require("express").Router()
const router = e.Router();

router.post("/add-review", userAuth,addReview)
router.delete("/delete-review/:reviewId",deleteReview)
router.get("/average-rating/:menuId ",userAuth,averageRating)


module.exports = reviewRouter;
const  e = require('express');
const { userAuth } = require('../../middlewares/userAuth');
const { addReview, getMenuReview, deleteReview, averageRating } = require('../../controllers/reviewControllers');
const reviewRouter = require("express").Router()
const router = e.Router();

router.post("/add-review", userAuth,addReview)
router.get("/menu-review/:menuId", userAuth,getMenuReview)
router.delete("/delete-review/:reviewId",userAuth,deleteReview)
router.get("/average-rating/:menuId ",userAuth,averageRating)


module.exports = reviewRouter;
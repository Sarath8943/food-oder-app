const menuModels = require("../model/menuModels.js");
const Order = require("../model/orderModel.js");
const Review = require("../model/reviewModel.js");
const reviewModel = require("../model/reviewModel.js");

const addReview = async (req, res) => {
  try {
    const { menuId, rating, comment, orderId } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User ID is required" });
    }

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const order = await Order.findById(orderId).populate("cartId");
    if (!order || order.status !== " delivered") {
      return res
        .status(404)
        .json({ message: "rder not delivered or not found" });
    }

    const isMenuInOrder = order.items.some(
      (item) => item.menuId.toString() === menuId.toString()
    );
    if (!isMenuInOrder) {
      return res
        .status(400)
        .json({ message: "Menu item not part of the order." });
    }
    const exisitingreview = await Review.findOne({ userId, menuId, orderId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Review already exists for this order." });
    }
    const newReview = new Review({
      menuId,
      userId,
      orderId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: savedReview });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getMenuReview = async (req, res) => {
  try {
    const { menuId } = req.params;

    const review = await reviewModel
      .find({ menuId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    if (!review.length) {
      return res
        .status(400)
        .json({ message: " No review found for this menu " });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Internal server error".error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await reviewModel.findOneAndDelete({ _id: review, userId });
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }

    res.status(200).json({ message: " Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server eeror", error });
  }
};

const averageRating = async (req, res) => {
  try {
    const { menuId } = req.params;
    const review = await reviewModel.find({ menuId });
    if (!review.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this course " });
    }
    const averageRating =
      review.reduce((sum, review) => (sum = review.rating), 0) / review.length;
    res
      .status(200)
      .json({ message: "Average review fetched", data: averageRating });
  } catch (error) {
    res.status(500).json({ message: " Internal server error", error });
  }
};

module.exports = {
  addReview,
  addReview,
  getMenuReview,
  deleteReview,
  averageRating,
};

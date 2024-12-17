const menuModels = require("../model/menuModels.js");
const reviewModel = require("../model/reviewModel.js")

const  addReview = async (req, res) => {

    try {
         const { menuId, rating, comment  } = req.body;
         const userId =req.user._id;
   if (!menuId || !rating || !comment){
    return res.status(400).json({ message: " All fields are required"});
   }

const menuItem = await menuModels.findById(menuId);

       if (!user || role === "user"){
        returnres.status(400).json({ message: " User is not Authorized"})
       }
if(!menuItem)
    return res.status(400).json({ messsage:  " menu item not found"});


if (rating>5 || rating <=1){
    return res.status(400).json({ message: " please provide a proper rating"});

}

const review = await reviewModel.findOnAndUpdate(

    {  userId, menuId},
    { rating, comment},
    { new: true, upsert: true}
);

res.status(201).json({ message: " review created successfully", data:review});
    } catch (error) {
     res.status(500).json({ message: "Internal server error", error});   
    }
};



const getMenuReview = async (req, res) => {
 try {
    
const { menuId } = req.params;

const review = await reviewModel.find({ menuId})
.populate("userId", "name")
.sort({ createdAt: -1 });

if (!review.length){
    return res.status(400).json({ message: " No review found for this menu "})
}
  res.status(200).json(review);
 } catch (error) {
 res.status(500).json({ message: "Internal server error". error});
};
}

const deleteReview = async (req, res) => {

try {

    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await reviewModel.findOneAndDelete({ _id: review, userId });
    if (!review){
return res.status(404).json({ message: "Review not found or not authorized"});
    }    

res.status(200).json({ message: " Review deleted successfully" });

} catch (error) {
    res.status(500).json({ message: "Internal server eeror", error });

}};


const averageRating = async (req, res ) => {


try {

const { menuId } = req.params;
const review = await reviewModel.find({ menuId});
if (!review.length){

    return res.status(404).json({ message: "No reviews found for this course "});

}



const averageRating = review.reduce((sum, review) => sum = review.rating, 0) / review.length;
 res.status(200).json({ message:'Average review fetched', data:averageRating });   
} catch (error) {
    res.status(500).json({ message: " Internal server error", error });
}



}

module.exports = {addReview, addReview,getMenuReview,deleteReview,averageRating};
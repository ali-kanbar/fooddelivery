import commentModel from "../models/commentModel.js";
import foodModel from "../models/foodModel.js"
const addComment = async (req, res) => {
  try {
    const newComment = new commentModel({
      foodId: req.body.foodId,
      userId: req.body.userId,
      text: req.body.text,
      userName : req.body.userName,
      rating : req.body.rating,
    });
    await newComment.save();
    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    await commentModel.findOneAndDelete({foodId:req.body.foodId,userId:req.body.userId});
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const getFoodComments = async (req, res) => {
  try {
    const { foodId, userId } = req.body;
    const response = await commentModel.find({foodId});
    response.sort((a, b) => new Date(b.date) - new Date(a.date));
    let comments = response
    if (userId) {
      const userComment = response.find(comment => comment.userId == userId);
      const otherComments = response.filter(comment => comment.userId != userId);
      const orderedComments = userComment ? [userComment, ...otherComments] : otherComments;
      comments = orderedComments
    }
    res.json({ success: true, message: comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const getUserComments = async (req, res) => {
  try {
    const response = await commentModel.find({userId:req.body.userId,foodId:req.body.foodId});
    res.json({ success: true, message: response });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateAverageReview = async (req, res) => {
  try {
    const foodId = req.body.foodId
    const result = await commentModel.aggregate([
      { $match: { foodId } },
      { $group: { _id: "$foodId", rating: { $avg: "$rating" } } }
    ]);
  
    const rating = result[0] ? parseFloat(result[0].rating.toFixed(1)) : 5;
  
    await foodModel.findByIdAndUpdate(foodId, { rating }); 
    res.json({ success: true, message: "Rating Updated Successfully", newRating : rating});
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

const getReviewCount = async (req, res) => {
  try {
    const foodId = req.body.foodId
    const result = await commentModel.aggregate([
      { $match: { foodId } },
      { $group: { _id: "$foodId", count: { $sum: 1 } } }
    ]);
    const reviewsCount = result[0]?.count || 0
    await foodModel.findByIdAndUpdate(foodId, { reviewsCount }); 
    res.json({ success: true, message: "Got the Count", reviewsCount : reviewsCount});
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
}

const editComment = async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.text) {
      updateFields.text = req.body.text;
    }
    if (req.body.rating) {
      updateFields.rating = req.body.rating;
    }
    await commentModel.findOneAndUpdate(
      { foodId: req.body.foodId, userId: req.body.userId },
      updateFields
    );
    res.json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
}

export { addComment, deleteComment, getFoodComments, getUserComments, updateAverageReview, getReviewCount, editComment};

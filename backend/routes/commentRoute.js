import express from "express";
import { addComment, deleteComment,getFoodComments, getUserComments, updateAverageReview, getReviewCount, editComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/auth.js";
import optinalAauthMiddleware from "../middleware/optionalAuth.js";

const commentRouter = express.Router();

commentRouter.post("/add", authMiddleware, addComment);
commentRouter.post("/delete", authMiddleware, deleteComment);
commentRouter.post("/food", optinalAauthMiddleware, getFoodComments);
commentRouter.post("/user", authMiddleware, getUserComments);
commentRouter.post("/update-rating", updateAverageReview);
commentRouter.post("/count", getReviewCount);
commentRouter.post("/edit-comment", authMiddleware, editComment);

export default commentRouter;

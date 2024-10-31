import React, { useContext, useState } from "react";
import "./AddCommentPopup.css";
import ReviewStarRating from "../../components/ReviewStarRating/ReviewStarRating";
import xIcon from "./../../assets/cross_icon.png";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const AddCommentPopup = ({ dishName, closePopup, foodId, getReviewCount, getStarRating, isEditing, editingComment, onEditComplete }) => {
  const { url, token } = useContext(StoreContext);
  const [rating, setRating] = useState(isEditing ? editingComment.rating : 0);
  const [reviewText, setReviewText] = useState(isEditing ? editingComment.text : "");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleChangeText = (event) => {
    setReviewText(event.target.value);
  };

  const addReview = async () => {
    try {
      const data = {
        foodId: foodId,
        text: reviewText,
        rating: rating,
      };
      await axios.post(url + "/api/comment/add", data, {
        headers: { token },
      });
      closePopup()
      getStarRating()
      getReviewCount()
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateReview = async () => {
    try {
      const data = {
        foodId: foodId,
        text: reviewText,
        rating: rating,
      };
      await axios.post(url + "/api/comment/edit-comment", data, {
        headers: { token },
      });
      onEditComplete();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="add-review-overlay">
      <div className="add-review-container">
        <img
          src={xIcon}
          alt="Close"
          className="close-icon"
          onClick={closePopup}
        />
        <h2 className="add-review-title">
          {isEditing ? "Edit your review" : "How would you rate this dish?"}
        </h2>
        <ReviewStarRating 
          onRatingChange={handleRatingChange} 
          initialRating={isEditing ? editingComment.rating : 0}
        />
        <div className="review-form">
          <textarea
            className="review-textarea"
            name="add-review-text"
            placeholder={`Tell us about your personal experience with the ${dishName}`}
            rows="7"
            onChange={handleChangeText}
            value={reviewText}
          />
          <button
            className="submit-review-button"
            onClick={() => isEditing ? updateReview() : addReview()}
            disabled={!reviewText.trim()}
          >
            {isEditing ? "Update Review" : "Add your Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCommentPopup;

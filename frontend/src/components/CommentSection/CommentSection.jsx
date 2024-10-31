import React, { useState, useEffect } from "react";
import StarRating from "./../../components/StarRating/StarRating";
import { formatDistanceToNow } from "date-fns";
import { assets } from "../../assets/assets";
import axios from "axios";
import AddCommentPopup from "./../AddCommentPopup/AddCommentPopup";
import "./CommentSection.css";

const CommentSection = ({
  url,
  token,
  foodId,
  dishName,
  setShowLoginPopup,
  onRatingsUpdate,
  starRating,
  reviewCount,
}) => {
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [numberOfCommentsToDisplay, setNumberOfCommentsToDisplay] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const loadFoodComments = async () => {
    try {
      let response;
      if (token) {
        response = await axios.post(
          `${url}/api/comment/food`,
          { foodId },
          { headers: { token } }
        );
      } else {
        response = await axios.post(`${url}/api/comment/food`, {
          foodId,
        });
      }
      setComments(response.data.message);
    } catch (error) {
      console.log("Error loading food comments:", error);
    }
  };

  const loadUserComments = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${url}/api/comment/user`,
        { foodId },
        { headers: { token } }
      );
      if (response.data.message.length > 0) {
        setShowButton(false);
      }
    } catch (error) {
      console.log("Error loading user comments:", error);
    }
  };

  const getReviewCount = async () => {
    try {
      const response = await axios.post(`${url}/api/comment/count`, {
        foodId,
      });
      return response.data.reviewsCount;
    } catch (error) {
      console.log("Error getting review count:", error);
      return 0;
    }
  };

  const getStarRating = async () => {
    try {
      const response = await axios.post(`${url}/api/comment/update-rating`, {
        foodId,
      });
      return response.data.newRating;
    } catch (error) {
      console.log("Error getting star rating:", error);
      return 0;
    }
  };

  const updateRatings = async () => {
    const [newReviewCount, newStarRating] = await Promise.all([
      getReviewCount(),
      getStarRating(),
    ]);
    onRatingsUpdate(newStarRating, newReviewCount);
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleEditComplete = async () => {
    setIsEditing(false);
    setEditingComment(null);
    setShowPopup(false);
    await loadFoodComments();
    await updateRatings();
  };

  const deleteComment = async () => {
    try {
      await axios.post(
        `${url}/api/comment/delete`,
        { foodId },
        { headers: { token } }
      );
      setShowButton(true);
      await loadFoodComments();
      await updateRatings();
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const handleShowPopup = () => {
    if (token) {
      setShowPopup(!showPopup);
    } else {
      setShowLoginPopup(true);
    }
  };

  useEffect(() => {
    loadFoodComments();
    updateRatings();
    if (token) {
      loadUserComments();
    }
  }, [token, starRating, reviewCount]);

  return (
    <div className="food-page-comment-section">
      <h2 className="section-title">Check Customers Opinion</h2>
      {showButton && (
        <button onClick={handleShowPopup}>What do you think?</button>
      )}
      {showPopup && (
        <AddCommentPopup
          closePopup={() => {
            setShowPopup(false);
            setIsEditing(false);
            setEditingComment(null);
          }}
          dishName={dishName}
          foodId={foodId}
          getReviewCount={updateRatings}
          getStarRating={updateRatings}
          isEditing={isEditing}
          editingComment={editingComment}
          onEditComplete={handleEditComplete}
        />
      )}
      <hr className="section-divider" />
      {!token ? (
        comments.slice(0, numberOfCommentsToDisplay).map((comment, index) => (
          <div className="food-page-comment" key={index}>
            <div className="comment-header">
              <p className="user-name">{comment.userName}</p>
              <p className="comment-date">
                {formatDistanceToNow(new Date(comment.date), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="review-stars">
              <StarRating rating={comment.rating} showRatingNumber={false} />
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))
      ) : (
        <div>
          {comments
            .slice(0, numberOfCommentsToDisplay)
            .map((comment, index) => (
              <div className="food-page-comment" key={index}>
                <div className="comment-header">
                  {index === 0 && !showButton && (
                    <>
                      <img
                        src={assets.edit_icon}
                        className="edit-comment-icon"
                        onClick={() => handleEditClick(comment)}
                      />
                      <img
                        className="delete-comment-icon"
                        onClick={deleteComment}
                        src={assets.delete_icon}
                      />
                    </>
                  )}
                  <p className="user-name">{comment.userName}</p>
                  <p className="comment-date">
                    {formatDistanceToNow(new Date(comment.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="review-stars">
                  <StarRating
                    rating={comment.rating}
                    showRatingNumber={false}
                  />
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
        </div>
      )}
      {numberOfCommentsToDisplay < comments.length && (
        <div
          className="load-more-link"
          onClick={() => setNumberOfCommentsToDisplay((prev) => prev + 5)}
        >
          Load More
        </div>
      )}
    </div>
  );
};

export default CommentSection;

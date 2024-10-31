import React, { useContext, useEffect, useState } from "react";
import "./FoodPage.css";
import { useLocation } from "react-router-dom";
import { StoreContext } from "./../../context/StoreContext";
import StarRating from "./../../components/StarRating/StarRating";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import AddCommentPopup from "../AddCommentPopup/AddCommentPopup";
import { assets } from "../../assets/assets";

const FoodPage = ({ setShowLoginPopup }) => {
  const { url, token } = useContext(StoreContext);
  const location = useLocation();
  const {
    id,
    name,
    price,
    description,
    image,
    ingredients,
    rating,
    reviewsCount,
  } = location.state;
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [starRating, setStarRating] = useState(rating);
  const [reviewCount, setReviewCount] = useState(reviewsCount);
  const [numberOfCommentsToDisplay, setNumberOfCommentsToDisplay] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setIsEditing(true);
    setShowPopup(true);
  };
  
  const handleEditComplete = () => {
    setIsEditing(false);
    setEditingComment(null);
    setShowPopup(false);
    loadFoodComments();
    getReviewCount();
    getStarRating();
  };

  const loadFoodComments = async () => {
    try {
      let response;
      if (token) {
        response = await axios.post(
          url + "/api/comment/food",
          {
            foodId: id,
          },
          { headers: { token } }
        );
      } else {
        response = await axios.post(url + "/api/comment/food", {
          foodId: id,
        });
      }
      setComments(response.data.message);
    } catch (error) {
      console.log("Error");
    }
  };

  const loadUserComments = async () => {
    try {
      const response = await axios.post(
        url + "/api/comment/user",
        {},
        { headers: { token } }
      );
      if (response.data.message.length > 0) {
        setShowButton(false);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const getReviewCount = async () => {
    try {
      const response = await axios.post(url + "/api/comment/count", {
        foodId: id,
      });
      setReviewCount(response.data.reviewsCount);
    } catch (error) {
      console.log("Error");
    }
  };

  const getStarRating = async () => {
    try {
      const updateResponse = await axios.post(
        url + "/api/comment/update-review",
        {
          foodId: id,
        }
      );
      setStarRating(updateResponse.data.newRating);
    } catch (error) {
      console.log("Error");
    }
  };

  const deleteComment = async () => {
    try {
      await axios.post(
        url + "/api/comment/delete",
        { foodId: id },
        { headers: { token } }
      );
      setShowButton(true);
      loadFoodComments();
      getReviewCount();
      getStarRating();
    } catch (error) {
      console.log("Error");
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
    getReviewCount();
    getStarRating();
    loadFoodComments();
    if (token) {
      loadUserComments();
    }
  }, [token, starRating, reviewCount]);

  return (
    <div>
      <div className="food-page-item">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="food-page-image"
        />
        <div className="food-page-info">
          <h1 className="food-page-info-title">{name}</h1>
          <p className="food-page-info-price">${price}</p>
          <div className="food-page-info-rating">
            <StarRating rating={starRating} showRatingNumber={true} />
            <p className="review-count">
              ({reviewCount} review{reviewCount !== 1 && "s"})
            </p>
          </div>
          <p className="food-page-info-description">{description}</p>
          <p className="food-page-info-ingredients">
            <b>Ingredients:</b> {ingredients.join(", ")}
          </p>
        </div>
      </div>
      <hr className="section-divider" />
      <div className="food-page-comment-section">
        <h2 className="section-title">Check Customers Opinion</h2>
        {showButton && (
          <button onClick={() => handleShowPopup()}>What do you think?</button>
        )}
        {showPopup && (
          <AddCommentPopup
            closePopup={() => {
              setShowPopup(false);
              setIsEditing(false);
              setEditingComment(null);
            }}
            dishName={name}
            foodId={id}
            getReviewCount={getReviewCount}
            getStarRating={getStarRating}
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
            {comments[0] && !showButton && (
              <div className="food-page-comment" key={0}>
                <div className="comment-header">
                  <img
                    src={assets.edit_icon}
                    className="edit-comment-icon"
                    onClick={() => handleEditClick(comments[0])}
                  />
                  <img
                    className="delete-comment-icon"
                    onClick={() => deleteComment()}
                    src={assets.delete_icon}
                  />
                  <p className="user-name">{comments[0].userName}</p>
                  <p className="comment-date">
                    {formatDistanceToNow(new Date(comments[0].date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="review-stars">
                  <StarRating
                    rating={comments[0].rating}
                    showRatingNumber={false}
                  />
                </div>
                <p className="comment-text">{comments[0].text}</p>
              </div>
            )}
            {comments
              .slice(!showButton, numberOfCommentsToDisplay)
              .map((comment, index) => (
                <div className="food-page-comment" key={index + 1}>
                  <div className="comment-header">
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
    </div>
  );
};

export default FoodPage;

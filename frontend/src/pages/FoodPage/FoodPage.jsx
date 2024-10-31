import React, { useContext, useState } from "react";
import "./FoodPage.css";
import { useLocation } from "react-router-dom";
import { StoreContext } from "./../../context/StoreContext";
import StarRating from "./../../components/StarRating/StarRating";
import CommentSection from "../../components/CommentSection/CommentSection";

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

  const [starRating, setStarRating] = useState(rating);
  const [reviewCount, setReviewCount] = useState(reviewsCount);

  const handleRatingsUpdate = (newStarRating, newReviewCount) => {
    setStarRating(newStarRating);
    setReviewCount(newReviewCount);
  };

  return (
    <div>
      <div className="food-page-item">
        <img
          src={`${url}/images/${image}`}
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
      <CommentSection 
        url={url}
        token={token}
        foodId={id}
        dishName={name}
        setShowLoginPopup={setShowLoginPopup}
        onRatingsUpdate={handleRatingsUpdate}
        starRating={starRating}
        reviewCount={reviewCount}
      />
    </div>
  );
};

export default FoodPage;
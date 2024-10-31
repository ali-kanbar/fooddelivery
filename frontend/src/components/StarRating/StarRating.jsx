import React from "react";
import { Star, StarHalf } from "lucide-react";
import "./StarRating.css";

const StarRating = ({ rating , showRatingNumber}) => {
  const numberOfFullStars = Math.floor(rating);
  const numberOfHalfStars = rating - Math.floor(rating) >= 0.5 ? 1 : 0;
  return (
    <div>
      {[...Array(numberOfFullStars)].map((_, index) => (
        <Star key={index} className="full-star" />
      ))}
      {[...Array(numberOfHalfStars)].map((_, index) => (
          <StarHalf key={index} className="half-star" />
        ))}
      {showRatingNumber && <span>({rating.toFixed(1)})</span>}
    </div>
  );
};

export default StarRating;

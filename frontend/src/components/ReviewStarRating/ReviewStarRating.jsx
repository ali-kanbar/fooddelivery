import React, { useEffect, useState } from "react";
import "./ReviewStarRating.css";
const ReviewStarRating = ({ onRatingChange, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const [hover, setHover] = useState(0);

  const calculateRating = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const mouseX = e.clientX - rect.left;
    // If mouse is on the left half of the star
    if (mouseX < width / 2) {
      setRating(index - 0.5);
    } else {
      setRating(index);
    }
  };
  useEffect(()=>{
    onRatingChange(rating);
  },[rating])
  return (
    <div className="star-rating-container">
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="star-wrapper"
            onClick={(e) => calculateRating(e, index)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const width = rect.width;
              const mouseX = e.clientX - rect.left;
              if (mouseX < width / 2) {
                setHover(index - 0.5);
              } else {
                setHover(index);
              }
            }}
            onMouseLeave={() => setHover(rating)}
          >
            <div className="star-container">
              {/* Background star (always grey) */}
              <svg className="star background" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {/* Foreground star (filled based on rating) */}
              <svg
                className="star foreground"
                viewBox="0 0 24 24"
                style={{
                  clipPath: `inset(0 ${
                    index <= (hover || rating)
                      ? "0%"
                      : index - 0.5 <= (hover || rating)
                      ? "50%"
                      : "100%"
                  } 0 0)`,
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <p className="rating-text">
        {rating === 0
          ? "Select your rating"
          : rating <= 1
          ? "Poor"
          : rating <= 2
          ? "Fair"
          : rating <= 3
          ? "Good"
          : rating <= 4
          ? "Very good"
          : "Excellent"}
      </p>
      <span className="rating-number">{rating.toFixed(1)} out of 5</span>
    </div>
  );
};

export default ReviewStarRating;

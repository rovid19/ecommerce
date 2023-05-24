import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewStarRating = () => {
  const [rating, setRating] = useState(null);
  return (
    <fieldset className="w-full h-full flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar className="star" size={50} />
          </label>
        );
      })}
    </fieldset>
  );
};

export default ReviewStarRating;

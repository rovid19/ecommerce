import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ReviewStarRating = ({
  setRatingActive,
  ratingActive,
  rating,
  setRating,
}) => {
  const dispatch = useDispatch();

  const [hover, setHover] = useState(null);

  return (
    <>
      <fieldset className="w-full h-full  fl2">
        <h1 className="mb-2">Rate this product</h1>
        <div className="flex ">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => {
                    setRating(currentRating);
                    setRatingActive(!ratingActive);
                  }}
                />
                <FaStar
                  className="star"
                  size={30}
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      </fieldset>
    </>
  );
};

export default ReviewStarRating;

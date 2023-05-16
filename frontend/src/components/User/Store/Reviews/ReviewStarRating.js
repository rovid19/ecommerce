import React from "react";

const ReviewStarRating = () => {
  return (
    <fieldset className="w-full h-full flex items-center justify-center">
      <label for="star5">
        <input id="star5" type="radio" name="rating" value="5" />
      </label>
      <label for="star4.5">
        <input id="star4.5" type="radio" name="rating" value="4.5" />
      </label>
      <label for="star4">
        <input id="star4" type="radio" name="rating" value="4" />
      </label>
      <label for="star3.5">
        <input id="star3.5" type="radio" name="rating" value="3.5" />
      </label>
      <label for="star3">
        <input id="star3" type="radio" name="rating" value="3" />
      </label>
      <label for="star2.5">
        <input id="star2.5" type="radio" name="rating" value="2.5" />
      </label>
      <label for="star2">
        <input id="star2" type="radio" name="rating" value="2" />
      </label>
      <label for="star1.5">
        <input id="star1.5" type="radio" name="rating" value="1.5" />
      </label>
      <label for="star1">
        <input id="star1" type="radio" name="rating" value="1" />
      </label>
      <label for="star0.5">
        <input id="star0.5" type="radio" name="rating" value="0.5" />
      </label>
      <label for="star0">
        <input id="star0" type="radio" name="rating" value="0" />
      </label>
    </fieldset>
  );
};

export default ReviewStarRating;

import React from "react";
import Ratings from "../../../util/Ratings";

function RatingFilter({ num, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="rating"
        className="accent-primary"
        onChange={() => onChange(num)}
        checked={value?.includes(num)}
      />
      <label htmlFor="rating">
        <Ratings rating={num} />
      </label>
    </div>
  );
}

export default RatingFilter;

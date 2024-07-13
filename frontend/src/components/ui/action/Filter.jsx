import React, { useState } from "react";
import { categoriesData } from "../../../util/data";
import RatingFilter from "./RatingFilter";
import RangeSlider from "./RangeSlider";

function Filter({
  searchText,
  setSearchText,
  catValue,
  setCatValue,
  ratingValue,
  setRatingValue,
  maxValue,
  minValue,
  setMaxValue,
  setMinValue,
}) {
  const handleRating = function (e) {
    if (ratingValue.includes(e)) {
      setRatingValue(ratingValue.filter((rat) => rat !== e));
    } else {
      setRatingValue([...ratingValue, e]);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="border-[1px] border-solid border-grey-200 p-2 rounded-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-[500]">Category</label>
        <select
          className="border-[1px] border-solid border-grey-200 p-2 rounded-md"
          value={catValue}
          onChange={(e) => setCatValue(e.target.value)}
        >
          {categoriesData.map((cat) => (
            <option key={cat.id} value={cat.title}>
              <div>{cat.title}</div>
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-2xl font-[500]">Pricing</h3>
        <RangeSlider
          maxValue={maxValue}
          minValue={minValue}
          setMaxValue={setMaxValue}
          setMinValue={setMinValue}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-[500]">Customer ratings</h3>
        {[5, 4, 3, 2, 1].map((num) => (
          <RatingFilter
            num={num}
            key={num}
            onChange={handleRating}
            value={ratingValue}
          />
        ))}
      </div>
    </>
  );
}

export default Filter;

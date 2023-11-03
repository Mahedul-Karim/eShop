import React, { useState } from "react";
import { categoriesData } from "../../../util/data";
import RatingFilter from "./RatingFilter";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [catValue, setCatValue] = useState("");
  const [ratingValue, setRatingValue] = useState([]);
  const [priceValue, setPriceValue] = useState(1000);

  const handleCategory = function (e) {
    setCatValue(e.target.value);
  };

  const handleRating = function (e) {
    if (ratingValue.includes(e)) {
      setRatingValue((prev) => prev.filter((rat) => rat !== e));
    } else {
      setRatingValue((prev) => [...prev, e]);
    }
  };
  
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="border-[1px] border-solid border-grey-200 p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-[500]">Category</label>
        <select
          className="border-[1px] border-solid border-grey-200 p-2"
          value={catValue}
          onChange={handleCategory}
        >
          {categoriesData.map((cat) => (
            <option key={cat.id} value={cat.title}>
              <div>{cat.title}</div>
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-[500]">
          Price<span className="text-[12px] text-dot">(${priceValue})</span>
        </label>
        <input
          type="range"
          min={1000}
          max={10000}
          className="accent-primary"
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
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

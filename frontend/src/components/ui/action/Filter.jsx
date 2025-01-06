import React, { useRef, useState } from "react";
import { categoriesData } from "../../../util/data";
import RatingFilter from "./RatingFilter";
import RangeSlider from "./RangeSlider";
import { FaChevronDown } from "react-icons/fa6";
import useOutsideClick from "../../hooks/useOutsideClick";
import Dropdown from "../dropdown/Dropdown";

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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    setOpen(false);
  });

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
          className="border-[1px] border-solid border-border p-2 rounded-md w-full text-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-[500]">Category</label>
        <Dropdown value={catValue || "All"}>
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className="hover:bg-background"
              onClick={() => setCatValue(cat.title)}
            >
              {cat.title}
            </div>
          ))}
        </Dropdown>
      </div>
      <div>
        <h3 className="text-lg font-[500]">Pricing</h3>
        <RangeSlider
          maxValue={maxValue}
          minValue={minValue}
          setMaxValue={setMaxValue}
          setMinValue={setMinValue}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-[500]">Customer ratings</h3>
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

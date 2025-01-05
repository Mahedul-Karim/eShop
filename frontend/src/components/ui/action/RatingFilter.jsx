import React from "react";
import Ratings from "../../../util/Ratings";
import { IoIosCheckmark } from "react-icons/io";
function RatingFilter({ num, value, onChange }) {
  return (
    <div className="flex items-center gap-2 relative">
      <input
        type="checkbox"
        id={`rating-${num}`}
        className="accent-secondary w-8 h-8 absolute opacity-0 z-[999999]"
        onChange={() => onChange(num)}
        checked={value?.includes(num)}
      />
      <div className={`w-4 h-4 border border-solid flex items-center justify-center rounded-full ${!value?.includes(num) ? 'border-gray-400' : 'border-secondary'} `}>
        <IoIosCheckmark size={28} className={`${value?.includes(num) ? 'block' : 'hidden'}`} color="#E90074"/>
      </div>
      <label htmlFor={`rating-${num}`} className="cursor-pointer">
        <Ratings rating={num} />
      </label>
    </div>
  );
}

export default RatingFilter;

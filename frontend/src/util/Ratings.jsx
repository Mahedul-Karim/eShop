import React from "react";
import { FaStar,FaRegStar,FaStarHalfAlt } from "react-icons/fa";
/**
 * #ff497c
 * #ffdc60
 */
function Ratings({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <FaStar
          key={i}
          // size={16}
          color="#ff497c"
          className="cursor-pointer text-[12px] sm:text-[14px]"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <FaStarHalfAlt
          key={i}
         
          color="#ff497c"
          className="cursor-pointer text-[12px] sm:text-[14px]"
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          color="#777777"
          className="cursor-pointer text-[12px] sm:text-[14px]"
        />
      );
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
export default Ratings;

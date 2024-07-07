import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

function Ratings({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          // size={16}
          color="#E90074"
          className="cursor-pointer text-[14px] sm:text-[16px]"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color="#E90074"
          className="cursor-pointer"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          // size={16}
          color="#E90074"
          className="cursor-pointer text-[14px] sm:text-[16px]"
        />
      );
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
export default Ratings;

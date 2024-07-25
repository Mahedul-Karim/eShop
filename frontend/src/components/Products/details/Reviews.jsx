import React from "react";

const Reviews = ({ avgRating, reviews }) => {
  return (
    <div
      className="border border-solid mt-8 px-4 py-6 rounded-md"
      id="review__section"
    >
      <h4 className="text-lg 400px:text-xl font-semibold ">Reviews</h4>
      <div className="h-[0.8px] bg-[#e5e7eb] w-full my-2" />
      
    </div>
  );
};

export default Reviews;

import React from "react";
import Ratings from "../../../util/Ratings";

const Reviews = ({ reviews }) => {
  return (
    <div
      className="border border-solid mt-8 px-4 py-6 rounded-md"
      id="review__section"
    >
      <h4 className="text-lg 400px:text-xl font-semibold ">Reviews</h4>
      <div className="h-[0.8px] bg-[#e5e7eb] w-full my-2" />
      <div className="flex flex-col gap-4 mt-6">
        {reviews.map((rev, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <div className="flex items-center gap-2">
              <img
                src={rev?.user?.avatar?.url}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <p className="text-[16px] capitalize font-semibold">{`${rev?.user?.name}`}</p>
              <Ratings rating={rev?.rating} />{" "}
              </div>
            </div>
            
     
            <p className="text-richblack-100 text-base">{rev?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

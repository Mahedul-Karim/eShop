import React from "react";

const Description = ({ description }) => {
  return (
    <div
      className="border border-solid mt-8 px-4 py-6 rounded-md"
      id="product__details"
    >
      <h4 className="text-lg 400px:text-xl font-semibold ">
        Product Description
      </h4>
      <div className="h-[0.8px] bg-[#e5e7eb] w-full my-2" />
      <p className="400px:text-base text-sm">{description}</p>
    </div>
  );
};

export default Description;

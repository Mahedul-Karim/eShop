import React from "react";
import ProductCard from "./ProductCard";

const SuggestedProduct = ({ data }) => {
  

  return (
    <div>
      {data.length > 0 ? (
        <div className={``}>
          <h2
            className={`text-center md:text-start font-Roboto pb-[20px] text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

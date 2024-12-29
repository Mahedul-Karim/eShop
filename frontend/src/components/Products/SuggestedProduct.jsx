import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SuggestedProduct = ({ data }) => {
  const { product } = useSelector((state) => state.product);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const sugData =
      product && product.filter((prd) => prd.category === data.category);
    setProducts(sugData);
  }, []);

  return (
    <div>
      {data ? (
        <div className={``}>
          <h2
            className={`text-center md:text-start font-Roboto pb-[20px] text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

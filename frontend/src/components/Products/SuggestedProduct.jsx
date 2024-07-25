import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../util/style";
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
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

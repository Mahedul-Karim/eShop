import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../util/style";
import ProductCard from "./ProductCard";
import { useHttp } from "../hooks/useHttp";
import { productActions } from "../../store/productSlice";
import { toast } from "react-toastify";
import Loader from "../../util/Loader";

const FeaturedProduct = () => {
  const [isLoading, fetchData, error] = useHttp();

  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    const allProducts = async function () {
      const data = await fetchData(`product`);

      if (error) {
        return toast.error(error);
      }

      dispatch(productActions.allProducts(data.products));
    };
    allProducts();
  }, [dispatch, fetchData, error]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {isLoading ? (
            <Loader />
          ) : (
            product &&
            product.length !== 0 && (
              <>
                {product &&
                  product.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useHttp } from "../hooks/useHttp";
import { productActions } from "../../store/productSlice";
import Loader from "../../util/Loader";
import Container from "../../util/Container";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  
  const [isLoading, fetchData, error] = useHttp();

  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const productCards = product?.slice(0, 8);

  useEffect(() => {
    const allProducts = async function () {
      const data = await fetchData(`product`);

      if (error) {
        return console.log(error);
      }

      dispatch(productActions.allProducts(data.products));
    };
    allProducts();
  }, [dispatch, fetchData, error]);

  return (
    <Container styles={"my-4 py-4 relative"}>
      <Heading>Our Products</Heading>
      <div className={`mt-6`}>
        {isLoading ? (
          <div className="h-[200px]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 place-items-center">
              {productCards.length !== 0 ? (
                productCards.map((pro) => (
                  <ProductCard data={pro} key={pro._id}  />
                ))
              ) : (
                <div className="flex items-center justify-center w-full col-span-full">
                  <img src="/assets/images.png" alt="No products" />
                </div>
              )}
            </div>
            {productCards.length !== 0 && (
              <div className="flex item-center justify-center">
                <Link
                  to={"/products"}
                  className="bg-primary rounded-md text-white 400px:px-4  400px:py-2 mt-6 text-[12px] px-3 py-1 400px:text-base"
                >
                  View All Products
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default HomeProducts;

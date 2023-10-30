import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useHttp } from "../hooks/useHttp";
import { productActions } from "../../store/productSlice";
import { toast } from "react-toastify";
import Loader from "../../util/Loader";
import Container from "../../util/Container";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CarouselButton from "../ui/button/CarouselButton";
import Title from "../ui/section/Title";

const FeaturedProduct = () => {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(1);
  const cardContainer = useRef();
  const [isLoading, fetchData, error] = useHttp();

  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const productCards = product?.slice(0, 6);

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

  const calculateEndProduct = function () {
    const clientWidth = document.documentElement.clientWidth;
    if (clientWidth >= 800) {
      return 2;
    }
    if (clientWidth >= 640 && clientWidth <= 800) {
      return 3;
    }
    if (clientWidth >= 400 && clientWidth <= 640) {
      return 4;
    }
    if (clientWidth < 400) {
      return productCards?.length - 1;
    }
  };

  return (
    <Container styles={"my-4 py-4 relative"}>
      <Title active={active} setActive={setActive} />
      <div className={`overflow-x-hidden mt-6`}>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className="grid grid-flow-col auto-cols-[calc((100%_/_1)_-_6px)] 400px:auto-cols-[calc((100%_/_2)_-_6px)] sm:auto-cols-[calc((100%_/_3)_-_6px)] 800px:auto-cols-[calc((100%_/_4)_-_6px)] gap-2"
            style={{
              transition: "all 0.4s",
              transform: `translateX(-${
                (cardContainer?.current?.clientWidth + 10) * current
              }px)`,
            }}
          >
            {productCards.length !== 0 ? (
              productCards.map((pro) => (
                <ProductCard
                  data={pro}
                  key={pro._id}
                  current={current}
                  ref={cardContainer}
                />
              ))
            ) : (
              <p className="text-center text-3xl col-span-4 py-10">
                No products available!
              </p>
            )}
          </div>
        )}
      </div>
      <CarouselButton
        classes={`left-0 bg-secondary text-white ${
          (product.length === 0 || isLoading) && "hidden"
        }`}
        onClick={() => setCurrent((prev) => (prev === 0 ? 0 : prev - 1))}
      >
        <BsChevronLeft size={20} />
      </CarouselButton>

      <CarouselButton
        classes={`right-0 bg-secondary text-white ${
          (product.length === 0 || isLoading) && "hidden"
        }`}
        onClick={() =>
          setCurrent((prev) =>
            prev === calculateEndProduct() ? calculateEndProduct() : prev + 1
          )
        }
      >
        <BsChevronRight size={20} />
      </CarouselButton>
    </Container>
  );
};

export default FeaturedProduct;

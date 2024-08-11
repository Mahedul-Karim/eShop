import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../../util/style";
import ProductCard from "../Products/ProductCard";
import { productActions } from "../../store/productSlice";
import { eventActions } from "../../store/eventSlice";
import { useToast } from "../hooks/useToast";
import { useHttp } from "../hooks/useHttp";
import Loader from "../../util/Loader";
import Ratings from "../../util/Ratings";

const ShopProfileData = ({ isOwner }) => {
  const { shopId } = useParams();

  const [isLoading, fetchData, error] = useHttp();

  const { error: toastError } = useToast();

  const { product } = useSelector((state) => state.product);
  const { event } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const getProducts = async function () {
    const data = await fetchData(`product/${shopId}`);

    if (error) {
      return toastError(error);
    }

    dispatch(productActions.allProducts(data.product));
  };

  const getEvents = async function () {
    const data = await fetchData(`event/${shopId}`);

    if (error) {
      return toastError(error);
    }

    dispatch(eventActions.allevents(data.event));
  };

  useEffect(() => {
    getProducts();
    getEvents();
  }, [dispatch]);

  const reviews = product && product.flatMap((p) => p.reviews);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh]">

        <Loader />
        </div>
      ) : (
        <div className="my-4">
          <div className="flex md:items-center md:flex-row flex-col md:justify-between">
            <div className="flex">
              <div className="flex items-center" onClick={() => setActive(1)}>
                <h5
                  className={`font-[600] text-xs 400px:text-base ${
                    active === 1 ? "text-red-500" : "text-[#333]"
                  } cursor-pointer pr-[20px]`}
                >
                  Shop Products
                </h5>
              </div>
              <div className="flex items-center" onClick={() => setActive(2)}>
                <h5
                  className={`font-[600] text-xs 400px:text-base ${
                    active === 2 ? "text-red-500" : "text-[#333]"
                  } cursor-pointer pr-[20px]`}
                >
                  Running Events
                </h5>
              </div>

              <div className="flex items-center" onClick={() => setActive(3)}>
                <h5
                  className={`font-[600] text-xs 400px:text-base ${
                    active === 3 ? "text-red-500" : "text-[#333]"
                  } cursor-pointer pr-[20px]`}
                >
                  Shop Reviews
                </h5>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-end md:justify-normal mt-4 md:mt-0">
                {isOwner ? (
                  <Link to="/seller/dashboard">
                    <div
                      className={`bg-black flex items-center justify-center rounded-md cursor-pointer py-2 px-3 400px:text-base text-sm`}
                    >
                      <span className="text-[#fff]">Go Dashboard</span>
                    </div>
                  </Link>
                ) : (
                  <Link to="/">
                    <div
                      className={`bg-black flex items-center justify-center rounded-md cursor-pointer py-2 px-3`}
                    >
                      <span className="text-[#fff]">Go Home</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <br />
          {active === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 overflow-hidden">
              {product &&
                product.map((i, index) => (
                  <ProductCard data={i} key={index} isShop={true} />
                ))}
            </div>
          )}

          {active === 2 && (
            <div className="w-full">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                {event &&
                  event.map((i, index) => (
                    <ProductCard
                      data={i}
                      key={index}
                      isShop={true}
                      isEvent={true}
                    />
                  ))}
              </div>
              {event && event.length === 0 && (
                <h5 className="w-full text-center py-5 text-[18px]">
                  No Events have for this shop!
                </h5>
              )}
            </div>
          )}

          {active === 3 && (
            <div className="w-full">
              {reviews &&
                reviews.map((item, index) => (
                  <div className="w-full flex my-4" key={item._id}>
                    <img
                      src={`${item.user?.avatar?.url}`}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                    <div className="pl-2">
                      <div className="flex w-full items-center">
                        <h1 className="font-[600] pr-2">{item.user?.name}</h1>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="font-[400] text-[#000000a7]">
                        {item?.comment}
                      </p>
                      <p className="text-[#000000a7] text-[14px]">
                        {item.createdAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                ))}
              {product.reviews && product.reviews.length === 0 && (
                <h5 className="w-full text-center py-5 text-[18px]">
                  No Reviews have for this shop!
                </h5>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopProfileData;

import React from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import Ratings from "../../../util/Ratings";

const Details = ({
  data,
  avgRating,
  handleMessageSubmit,
  count,
  setCount,
  click,
  removeFromWishlist,
  addToWishlist,
  handleCardAdd,
}) => {
  const handleScrollTo = () => {
    const selectedElement = document.getElementById("product__details");

    const offsetTop = selectedElement.offsetTop - 100;

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col py-[15px] md:py-0 px-[10px] lg:px-[50px] md:justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg 400px:text-[22px] font-semibold leading-7 400px:leading-8">
          {data?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Ratings rating={avgRating} />
          <p className="text-dot text-[10px] 400px:text-[12px] sm:text-[14px] cursor-pointer hover:underline">
            ({data?.reviews?.length} reviews) |
          </p>
          <p
            className={`${
              data?.stock > 0 ? "text-green-500" : "text-primary"
            } text-[10px] 400px:text-[12px] sm:text-[14px]`}
          >
            {data?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <p className="text-lg 400px:text-[22px] font-medium">${data?.price}</p>
        <p className="text-sm 400px:text-[16px] leading-6">
          {data?.description?.length <= 271
            ? data?.description
            : data?.description?.substring(0, 271) + "..."}
          {data?.description?.length > 271 && (
            <button
              className="text-primary text-[14px] hover:underline"
              onClick={handleScrollTo}
            >
              Read More!
            </button>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-8">
        <div className="flex items-center justify-between my-4 md:my-0">
          <div className="flex gap-2 items-center">
            <Link to={`/shop/preview/${data?.shopId}`}>
              <img
                src={`${data?.shop?.avatar.url}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-2"
              />
            </Link>
            <Link to={`/shop/preview/${data?.shopId}`}>
              <h3
                className={`text-[15px] text-primary underline hidden 400px:block`}
              >
                {data?.shop?.name}
              </h3>
            </Link>
          </div>
          <div
            className={`flex items-center justify-center bg-primary cursor-pointer px-3 py-2 rounded-md`}
            onClick={handleMessageSubmit}
          >
            <span className="text-white flex items-center text-sm 400px:text-base">
              Send Message <AiOutlineMessage className="ml-1" />
            </span>
          </div>
        </div>
        <div className="h-[0.8px] bg-[#e5e7eb] w-full my-2 md:my-[15px]" />

        <div className="flex items-center justify-between">
          <div className="flex items-center w-[30%] rounded-md justify-between h-8 400px:h-[40px]">
            <button
              className="border border-solid border-gray-400 w-[30%]  rounded-tl-md rounded-bl-md 400px:text-2xl h-full"
              onClick={() => count > 1 && setCount((prev) => prev - 1)}
            >
              -
            </button>
            <p className="w-[40%] flex items-center justify-center  border-t border-b border-solid border-gray-400 h-full 400px:text-base text-sm">
              {count}
            </p>
            <button
              className="w-[30%] bg-primary  text-white border border-solid border-primary rounded-tr-md rounded-br-md 400px:text-2xl h-full"
              onClick={() => data.stock > count && setCount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className="h-8 400px:h-10 w-[40%] rounded-md bg-primary text-white flex items-center justify-center text-sm 400px:text-base"
            onClick={() => handleCardAdd(data)}
          >
            Add to Cart
          </button>
          <button className="h-8 400px:h-10 border border-solid border-gray-700 rounded-md flex items-center justify-center w-[10%]">
            {click ? (
              <AiFillHeart
                className="cursor-pointer text-[20px] 400px:text-[30px]"
                onClick={() => removeFromWishlist(data._id)}
                color={click ? "#e90074" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer text-[20px] 400px:text-[30px]"
                onClick={() => addToWishlist(data)}
                color={click ? "#e90074" : "#333"}
                title="Add to wishlist"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

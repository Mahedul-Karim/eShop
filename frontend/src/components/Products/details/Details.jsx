import React from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShop,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../../../util/Ratings";
import { CiShop } from "react-icons/ci";

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
  isInWishlist,
  isinCart,
}) => {
  const navigate = useNavigate();

  const handleScrollTo = () => {
    const selectedElement = document.getElementById("product__details");

    const offsetTop = selectedElement.offsetTop - 100;

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  const handleScrollToReview = () => {
    const reviewSection = document.getElementById("review__section");

    if (!reviewSection) return;

    window.scrollTo({ top: reviewSection.offsetTop - 100, behavior: "smooth" });
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(data._id);
    } else {
      addToWishlist(data);
    }
  };

  const handleBuy = () => {
    if (isinCart) {
      navigate("/checkout");
      return;
    }

    handleCardAdd(data, true);
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col px-[10px] lg:px-[50px] md:justify-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl 400px:text-2xl lg:text-3xl font-semibold">
          {data?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Ratings rating={avgRating} />
          <p
            className="text-dot text-[10px] 400px:text-[12px] sm:text-[14px] cursor-pointer hover:underline"
            onClick={handleScrollToReview}
          >
            ({data?.reviews?.length} reviews) |
          </p>
          <p
            className={`${
              data?.stock > 0 ? "text-green-500" : "text-secondary"
            } text-[10px] 400px:text-[12px] sm:text-[14px]`}
          >
            {data?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <p className="text-lg 400px:text-2xl font-semibold">${data?.price}</p>
        <p className="text-sm 400px:text-[16px] leading-6 text-[#55585B]">
          {data?.description?.length <= 271
            ? data?.description
            : data?.description?.substring(0, 271) + "..."}
          {data?.description?.length > 271 && (
            <button
              className="text-secondary text-[14px] hover:underline"
              onClick={handleScrollTo}
            >
              Read More!
            </button>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center w-[50%] 400px:w-[40%] justify-between h-8 400px:h-[40px]">
            <button
              className="border border-solid border-[#E0E2E3] w-[30%] 400px:text-2xl h-full"
              onClick={() => count > 1 && setCount((prev) => prev - 1)}
            >
              -
            </button>
            <p className="w-[40%] flex items-center justify-center  border-t border-b border-solid border-[#E0E2E3] h-full 400px:text-base text-sm">
              {count}
            </p>
            <button
              className="w-[30%] bg-secondary  text-white border border-solid border-secondary 400px:text-2xl h-full"
              onClick={() => data.stock > count && setCount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className="h-8 400px:h-10 w-[50%] 400px:w-full hover:bg-zinc-900 border border-solid border-[#E0E2E3] text-[#01051C] transition-all duration-300 hover:text-white flex items-center justify-center text-sm 400px:text-base"
            onClick={() => handleCardAdd(data)}
          >
            Add to Cart
          </button>
        </div>
        <div>
          <button
            className="h-8 400px:h-10 w-full hover:bg-zinc-900 bg-secondary text-white transition-all duration-300 hover:text-white flex items-center justify-center text-sm 400px:text-base mt-2"
            onClick={handleBuy}
          >
            Buy Now
          </button>
        </div>
        <div className="h-[0.8px] bg-[#e5e7eb] w-full mt-2 md:mt-[15px]" />
        <div className="flex gap-3">
          <Link
            to={`/shop/preview/${data?.shop?._id}`}
            className="flex items-center gap-1 text-xs 400px:text-sm sm:text-base text-[#55585B]"
          >
            <AiOutlineShop className="text-sm 400px:text-base sm:text-lg" />
            Visit Shop
          </Link>
          <button
            className="flex items-center gap-1 text-xs 400px:text-sm sm:text-base text-[#55585B]"
            onClick={handleWishlist}
          >
            {isInWishlist ? (
              <AiFillHeart
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(data._id)}
                className="text-sm 400px:text-base sm:text-lg text-primary-red"
              />
            ) : (
              <AiOutlineHeart
                color={"#333"}
                title="Add to wishlist"
                onClick={() => addToWishlist(data)}
                className="text-sm 400px:text-base sm:text-lg"
              />
            )}{" "}
            Wishlist
          </button>
          <button
            className="flex items-center gap-1 text-xs 400px:text-sm sm:text-base text-[#55585B]"
            onClick={handleMessageSubmit}
          >
            <AiOutlineQuestionCircle className="text-sm 400px:text-base sm:text-lg" />
            Ask a question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

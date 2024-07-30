import { useState, useEffect, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { wishlistAction } from "../../store/wishlistSlice";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { useToast } from "../hooks/useToast";
import Ratings from "../../util/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
 

  const { success, warning } = useToast();

  const dispatch = useDispatch();

  const productName = data.name.replace(/\s+/, "-");

  useEffect(() => {
    if (wishlist && wishlist.find((w) => w._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const addToWishlist = function (product) {
    const existingProduct = wishlist.find((prod) => prod._id === product._id);

    if (existingProduct) {
      warning("Product is already in wishlist");
      return;
    }

    setClick(true);
    dispatch(wishlistAction.addTowishlist(product));
    success("Product was added to wishlist");
  };

  const removeFromWishlist = function (id) {
    setClick(false);
    dispatch(wishlistAction.removewishlistItem(id));
    warning("Product was removed from wishlist");
  };

  const handleCartAdd = function (product) {
    dispatch(cartAction.addToCart({ ...product, quantity: 1 }));
    success("Product added to cart");
  };

  return (
    <>
      <div
        className="border-[1px] border-solid border-grey-200 p-2 sm:p-3 flex flex-col cursor-pointer group transition-all w-full h-[230px] sm:h-[350px]"

      >
        <div className="h-[120px] sm:h-[250px] max-w-[270px] flex items-center justify-center relative">
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt="img"
            className="max-w-[90px] sm:max-w-[150px] sm:h-[180px] object-contain block"
          />
          <div className="absolute right-0 top-5 flex flex-col gap-2 items-center justify-center ">
            {click ? (
              <AiFillHeart
                color={click ? "#E90074" : ""}
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(data._id)}
                className="text-[22px] lg:text-[27px]"
              />
            ) : (
              <AiOutlineHeart
                color={click ? "#E90074" : "#333"}
                title="Add to wishlist"
                onClick={() => addToWishlist(data)}
                className="text-[22px] lg:text-[27px] hover:text-[#E90074]"
              />
            )}
            <AiOutlineShoppingCart
              onClick={() => handleCartAdd(data)}
              color="#333"
              title="Add to cart"
              className="text-[22px] lg:text-[27px]"
            />
          </div>
        </div>
        <div onClick={() => navigate(`/product/${productName}`)}>
          <h3 className="text-dot text-[10px] sm:text-[12px]">
            {data?.category}
          </h3>
          <h2 className="font-[500] text-[12px] 400px:text-[14px] sm:text-[16px] line-clamp-1">
            {data.name}
          </h2>
          <p className="text-[12px] 400px:text-[14px] sm:text-[16px] font-[600] text-secondary">
            ${data?.price}
          </p>
          <div className="mt-1 400px:mt-2 flex items-center gap-2">
            <div>
              <Ratings rating={data?.ratings} />
            </div>
            <span className="text-dot text-[10px] 400px:text-[12px] sm:text-[14px]">
              ({data?.reviews?.length})
            </span>
          </div>
        </div>
      </div>
    </>
  );
};


export default ProductCard;

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
  const navigate = useNavigate();

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const isInWishlist = !!wishlist?.find((w) => w._id === data?._id);
  const isInCart = !!cart?.find((c) => c._id === data?._id);

  const { success, warning, error } = useToast();

  const dispatch = useDispatch();

  const productName = data?.name.replace(/\s+/, "-");

  const addToWishlist = function (product) {
    dispatch(wishlistAction.addTowishlist(product));
    success("Product was added to wishlist");
  };

  const removeFromWishlist = function (id) {
    dispatch(wishlistAction.removewishlistItem(id));
    warning("Product was removed from wishlist");
  };

  const handleCartAdd = function (product) {
    if (isInCart) {
      error("Product is already in the cart");
      return;
    }
    dispatch(cartAction.addToCart({ ...product, quantity: 1 }));
    success("Product added to cart");
  };

  return (
    <>
      <div className="border-[1px] border-solid border-grey-200 rounded-md p-2 sm:p-3 flex flex-col cursor-pointer group transition-all w-full h-[230px] sm:h-[350px]">
        <div className="h-[120px] sm:h-[250px] max-w-[270px] flex items-center justify-center relative">
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt="img"
            className="max-w-[90px] sm:max-w-[150px] sm:h-[180px] object-contain block"
          />
          <div className="absolute right-0 top-5 flex flex-col gap-2 items-center justify-center ">
            {isInWishlist ? (
              <AiFillHeart
                color={"#E90074"}
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(data._id)}
                className="text-[22px] lg:text-[27px]"
              />
            ) : (
              <AiOutlineHeart
                color={"#333"}
                title="Add to wishlist"
                onClick={() => addToWishlist(data)}
                className="text-[22px] lg:text-[27px]"
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

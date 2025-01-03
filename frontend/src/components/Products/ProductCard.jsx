import { Link, useNavigate } from "react-router-dom";
import { wishlistAction } from "../../store/wishlistSlice";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
//241 245 255
//#f1f5ff
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
  //255 h-[150px] 400px:h-[230px]
  return (
    <>
      <div className="flex flex-col gap-4 w-full group cursor-pointer rounded-md pb-4 h-full group overflow-clip">
        <div className="relative flex justify-center h-[120px] 400px:h-[200px] overflow-clip">
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt="img"
            className="object-cover w-full h-full rounded-md"
          />
          <div className="absolute -bottom-[50px] group-hover:bottom-5  transition-all duration-300 flex  gap-2 items-center justify-center ">
            <div className="bg-[#f1f5ff] flex items-center justify-center rounded-md w-[25px] h-[25px] 400px:w-[30px]  400px:h-[30px]">
              {isInWishlist ? (
                <AiFillHeart
                  title="Remove from wishlist"
                  onClick={() => removeFromWishlist(data._id)}
                  className="text-[16px] lg:text-[20px] text-primary-red"
                />
              ) : (
                <AiOutlineHeart
                  color={"#333"}
                  title="Add to wishlist"
                  onClick={() => addToWishlist(data)}
                  className="text-[16px] lg:text-[20px]"
                />
              )}
            </div>
            <button className="bg-[#f1f5ff] flex items-center justify-center rounded-md w-[25px] h-[25px] 400px:w-[30px]  400px:h-[30px]">
              <AiOutlineShoppingCart
                onClick={() => handleCartAdd(data)}
                color="#333"
                title="Add to cart"
                className="text-[16px] lg:text-[20px]"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <div className="flex items-center gap-2">
            <div>
              <Ratings rating={data?.ratings} />
            </div>
            <span className="text-dot text-[10px] 400px:text-[12px] sm:text-[14px]">
              ({data?.reviews?.length})
            </span>
          </div>
          <Link
            to={`/product/${productName}`}
            className="font-sans font-medium text-[12px] 400px:text-[14px] sm:text-[16px] line-clamp-2 text-[#777777] transition-all duration-300 group-hover:text-primary"
          >
            {data.name}
          </Link>
          <p className="text-[14px] 400px:text-[16px] sm:text-[18px] font-[600] text-[#292930]">
            ${data?.price}
          </p>
        </div>
      </div>
      {/* <div className="border-[1px] border-solid border-border rounded-md p-2 sm:p-3 flex flex-col cursor-pointer group transition-all w-full h-[230px] sm:h-[350px] bg-white">
        <div className="h-[120px] sm:h-[250px] max-w-[270px] flex items-center justify-center relative">
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt="img"
            className="max-w-[90px] sm:max-w-[150px] sm:h-[180px] object-contain block"
          />
          <img
            src={`https://new.axilthemes.com/demo/template/etrade/assets/images/product/electric/product-01.png`}
            alt="img"
            className="object-cover"
          />
          <div className="absolute right-0 top-5 flex flex-col gap-2 items-center justify-center ">
            {isInWishlist ? (
              <AiFillHeart
                
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(data._id)}
                className="text-[22px] lg:text-[27px] text-primary-red"
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
          <h2 className="font-[500] text-[12px] 400px:text-[14px] sm:text-[16px] line-clamp-2">
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
      </div> */}
    </>
  );
};

export default ProductCard;

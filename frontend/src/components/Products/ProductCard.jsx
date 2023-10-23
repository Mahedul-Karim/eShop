import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../util/style";
import { wishlistAction } from "../../store/wishlistSlice";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { toast } from "react-toastify";
import Ratings from "../../util/Ratings";

function ProductCard({ data, isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const { wishlist } = useSelector((state) => state.wishlist);

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
    setClick(true);
    dispatch(wishlistAction.addTowishlist(product));
  };

  const removeFromWishlist = function (id) {
    setClick(false);
    dispatch(wishlistAction.removewishlistItem(id));
  };

  const handleCartAdd = function (product) {
    dispatch(cartAction.addToCart({ ...product, quantity: 1 }));
    toast.success("Product added to cart");
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link
          to={
            isEvent === true
              ? `/product/${productName}?isEvent=true`
              : `/product/${productName}`
          }
        >
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/`}>
          <h5>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${productName}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.substring(0, 40) + "..."}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings}/>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
              onClick={() => removeFromWishlist(data._id)}
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              title="Add to wishlist"
              onClick={() => addToWishlist(data)}
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen((prev) => !prev)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => handleCartAdd(data)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductModal setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
}
export default ProductCard;

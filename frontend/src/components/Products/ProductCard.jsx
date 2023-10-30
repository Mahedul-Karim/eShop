import { useState, useEffect,forwardRef } from "react";
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

const ProductCard = forwardRef(({ data, isEvent,current },ref) =>{
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
      <div className="border-[1px] border-solid border-grey-200 p-3 flex flex-col cursor-pointer group hover:shadow-lg transition-all" ref={ref}>
        <div className="h-[170px] flex items-center w-full justify-center relative">
          <img
            src={`${data.images && data.images.at(0)?.url}`}
            alt="img"
            className="w-[150px] h-auto object-contain block"
          />
          <div className="absolute right-2 top-5 flex flex-col gap-2 items-center justify-center -translate-x-[30px] opacity-0 invisible group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible transition-all">
            {click ? (
              <AiFillHeart
                size={27}
                color={click ? "#ef837b" : ""}
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(data._id || "")}
              />
            ) : (
              <AiOutlineHeart
                size={27}
                color={click ? "#ef837b" : "#333"}
                title="Add to wishlist"
                onClick={() => addToWishlist(data || "")}
              />
            )}
            <AiOutlineEye
              size={27}
              onClick={() => setOpen((prev) => !prev)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={27}
              onClick={() => handleCartAdd(data || "")}
              color="#333"
              title="Add to cart"
            />
          </div>
        </div>
        <div>
          <h3 className="text-dot text-[12px]">{data?.category}</h3>
          <h2 className="font-[500] text-[18px]">
            {data?.name?.length > 30 ? data?.name?.substring(0, 30)+'...' : data.name}
          </h2>
          <p className="text-[18px] font-[600] text-secondary">
            $
            {data?.originalPrice === 0
              ? data?.originalPrice
              : data?.discountPrice}
          </p>
          <div className="mt-2">
            <Ratings rating={data?.ratings} />
            <span className="text-dot text-[12px]">(2 reviews)</span>
          </div>
        </div>
      </div>
      {open ? <ProductModal setOpen={setOpen} data={data} /> : null}
    </>
  );
})

ProductCard.displayName='ProductCard';
export default ProductCard;

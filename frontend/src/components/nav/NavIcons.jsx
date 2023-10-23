import { useState } from "react";
import styles from "../../util/style";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/WishList";

function NavIcons() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector(state=>state.wishlist);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  return (
    <>
      <div className={`${styles.noramlFlex}`}>
        <div
          className="hidden 800px:inline-block relative 800px:cursor-pointer mr-[15px]"
          onClick={() => setOpenWishlist(true)}
        >
          <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {wishlist && wishlist.length}
          </span>
        </div>
      </div>

      <div className={`${styles.noramlFlex}`}>
        <div
          className="hidden 800px:inline-block relative cursor-pointer mr-[15px]"
          onClick={() => setOpenCart(true)}
        >
          <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
          {cart && cart.length}
          </span>
        </div>
      </div>
      <div className={`${styles.noramlFlex}`}>
        <div className="relative cursor-pointer mr-[15px]">
          {isLoggedIn ? (
            <Link to="/profile">
              <img
                src={user?.avatar?.url}
                alt=""
                className="w-[40px] h-[40px] rounded-full "
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile size={30} color="rgb(255 255 255 / 83%)" className="hidden 800px:inline-block"/>
              <span className="800px:hidden text-[18px] pr-[10px] text-[#000000b7]">Login</span>
            </Link>
          )}
        </div>
        {openCart && <Cart setOpenCart={setOpenCart} />}
        {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
      </div>
    </>
  );
}

export default NavIcons;

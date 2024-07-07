import { useState } from "react";
import styles from "../../util/style";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/WishList";
import UserAvatar from "../ui/UserAvatar";
import { CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci";
import SearchIcon from "../ui/SearchIcon";

function NavIcons() {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);



  return (
    <div className="flex items-center gap-2">
      <SearchIcon extraClass={"hidden 800px:inline-block"}/>
      
      <div className={`${styles.noramlFlex}`}>
        <div
          className="hidden 800px:inline-block relative 800px:cursor-pointer"
          onClick={() => setOpenWishlist(true)}
        >
          <CiHeart size={30} style={{ strokeWidth: "0.8px" }} />

          <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {wishlist && wishlist.length}
          </span>
        </div>
      </div>

      <div className={`${styles.noramlFlex}`}>
        <div
          className="hidden 800px:inline-block relative cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <CiShoppingCart size={30} style={{ strokeWidth: "0.8px" }} />
          <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {cart && cart.length}
          </span>
        </div>
      </div>
      <div className={`${styles.noramlFlex}`}>
        <div className="relative cursor-pointer hidden 800px:block">
          <UserAvatar />
        </div>
        {<Cart setOpenCart={setOpenCart} openCart={openCart} />}
        {
          <Wishlist
            setOpenWishlist={setOpenWishlist}
            openWishlist={openWishlist}
          />
        }
      </div>
    </div>
  );
}

export default NavIcons;

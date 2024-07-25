import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/WishList";
import { RxCross1 } from "react-icons/rx";
import Nav from "./Nav";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import Logo from "../ui/Logo";
import Siderbar from "../ui/sidebar/Siderbar";
import UserAvatar from "../ui/UserAvatar";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import SearchIcon from "../ui/SearchIcon";

function MobileNav({
  open,
  setOpen,
  setOpenWishlist,
  styles,
}) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <>
      <div className="block 800px:hidden border-b-[1px] border-solid border-grey-200 py-2">
        <div className="flex items-center justify-end gap-2">
          <SearchIcon />
          <div className={`${styles.noramlFlex}`}>
            <Link
              to={"/wishlist"}
              className="inline-block 800px:hidden relative cursor-pointer"
            >
              <CiHeart size={30} style={{ strokeWidth: "0.8px" }} />
              <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </Link>
          </div>

          <div className={`${styles.noramlFlex}`}>
            <Link
              className="inliner-block 800px:hidden relative cursor-pointer"
              to="/cart"
            >
              <CiShoppingCart size={30} style={{ strokeWidth: "0.8px" }} />
              <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`
      w-full bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between h-full py-5 shadow-sm">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <Logo />
          <div>
            <div className="relative mr-[20px]">
              <UserAvatar />
            </div>
          </div>
        </div>

        
        <Siderbar
          open={open}
          setOpen={setOpen}
          setOpenWishlist={setOpenWishlist}
        />
      </div>
    </>
  );
}
export default MobileNav;

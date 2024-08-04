import { useSelector } from "react-redux";
import UserAvatar from "../ui/UserAvatar";
import { CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci";
import SearchIcon from "../ui/SearchIcon";
import { Link } from "react-router-dom";

function NavIcons() {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="flex items-center gap-2">
      <SearchIcon extraClass={"hidden 800px:inline-block"} />

      <div className={`flex items-center`}>
        <Link
          to={"/wishlist"}
          className="hidden 800px:inline-block relative 800px:cursor-pointer"
        >
          <CiHeart size={30} style={{ strokeWidth: "0.8px" }} />

          <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {wishlist && wishlist.length}
          </span>
        </Link>
      </div>

      <div className={`flex items-center`}>
        <Link
          className="hidden 800px:inline-block relative cursor-pointer"
          to={"/cart"}
        >
          <CiShoppingCart size={30} style={{ strokeWidth: "0.8px" }} />
          <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {cart && cart.length}
          </span>
        </Link>
      </div>
      <div className={`flex items-center`}>
        <div className="relative cursor-pointer hidden 800px:block">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
}

export default NavIcons;

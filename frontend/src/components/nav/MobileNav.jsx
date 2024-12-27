import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import Logo from "../ui/Logo";
import Siderbar from "../ui/sidebar/Siderbar";
import UserAvatar from "../ui/UserAvatar";

function MobileNav({ open, setOpen, setOpenWishlist, styles }) {
  return (
    <>
      <div
        className={`w-full bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
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
          <div className="mr-[20px]">
            <UserAvatar />
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

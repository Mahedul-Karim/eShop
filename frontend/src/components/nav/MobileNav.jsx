import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/WishList";
import { RxCross1 } from "react-icons/rx";
import Nav from "./Nav";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

function MobileNav({
  active,
  open,
  setOpen,
  setOpenCart,
  openCart,
  openWishlist,
  setOpenWishlist,
  searchText,
  handleSearch,
  searchData,
  activePage,
  styles,
}) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector(state=>state.wishlist);
  return (
    <div
      className={`${
        active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
      }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <BiMenuAltLeft
            size={40}
            className="ml-4"
            onClick={() => setOpen(true)}
          />
        </div>
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
              className="mt-3 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <div className="relative mr-[20px]" onClick={() => setOpenCart(true)}>
            <AiOutlineShoppingCart size={30} />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
              {cart && cart.length}
            </span>
          </div>
        </div>
        {/* cart popup */}
        {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

        {/* wishlist popup */}
        {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
      </div>

      {/* header sidebar */}
      {open && (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px relative]">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchText}
                onChange={handleSearch}
              />
              {searchData && (
                <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                  {searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`} key={index}>
                        <div className="flex items-center">
                          <img
                            src={i.image_Url[0]?.url}
                            alt=""
                            className="w-[50px] mr-2"
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Nav activePage={activePage} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
}
export default MobileNav;

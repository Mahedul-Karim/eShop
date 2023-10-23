import { useEffect, useState } from "react";
import { productData } from "../../util/data";
import styles from "../../util/style";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "../nav/Nav";
import MobileNav from "../nav/MobileNav";
import { useSelector } from "react-redux";

function Header({ activePage }) {

  const { product } = useSelector(state=>state.product);

  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [open, setOpen] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const { isSellerLoggedIn } = useSelector(state=>state.seller);

  const handleSearch = function (e) {
    setSearchText(e.target.value);
    
    const filteredProduct =
      product &&
      product.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    setSearchData(filteredProduct);
    
  };

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchText}
              onChange={handleSearch}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-30vh bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((search, i) => {
                  const data = search.name;
                  const productName = data.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${productName}`} key={i}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={search.images[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{search.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                 {!isSellerLoggedIn ? 'Become seller' : 'Dashboard'}
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <Nav activePage={activePage} />
      </div>

      <MobileNav
        active={active}
        activePage={activePage}
        open={open}
        setOpen={setOpen}
        setOpenCart={setOpenCart}
        openCart={openCart}
        openWishlist={openWishlist}
        setOpenWishlist={setOpenWishlist}
        searchText={searchText}
        handleSearch={handleSearch}
        searchData={searchData}
        styles={styles}
      />
      
    </>
  );
}
export default Header;

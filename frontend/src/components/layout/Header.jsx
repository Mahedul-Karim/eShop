import { useEffect, useState } from "react";
import { productData } from "../../util/data";
import styles from "../../util/style";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "../nav/Nav";
import MobileNav from "../nav/MobileNav";
import { useSelector } from "react-redux";
import Container from "../../util/Container";
import { BsChevronRight } from "react-icons/bs";
import Logo from "../ui/Logo";
import SearchBar from "../ui/SearchBar";
import SellerLink from "../ui/SellerLink";

function Header({ activePage }) {
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [open, setOpen] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const { isSellerLoggedIn } = useSelector((state) => state.seller);

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
      <Container
        styles={
          "hidden 800px:block border-b-[1px] border-solid border-grey-200 pb-2"
        }
      >
        <div className="flex items-center justify-between py-3">
          <Logo />
          <SearchBar width={"35%"} />
          <SellerLink />
        </div>
      </Container>

        <div
          className={`${
            active ? "fixed top-0 left-0 z-10" : ""
          } transition hidden 800px:flex items-center justify-between w-full h-[70px] bg-white shadow-sm`}
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
        styles={styles}
      />
    </>
  );
}
export default Header;

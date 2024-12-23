import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../util/data";
import Container from "../../util/Container";
import Logo from "../ui/Logo";
import SearchIcon from "../ui/SearchIcon";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";

const Footer = () => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <>
      <footer className="bg-white text-black">
        <Container
          styles={
            "grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center"
          }
        >
          <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
            <Logo />
            <br />
            <p>The home and elements needeed to create beatiful products.</p>
            <div className="flex items-center mt-[15px]">
              <AiFillFacebook size={25} className="cursor-pointer" />
              <AiOutlineTwitter
                size={25}
                style={{ marginLeft: "15px", cursor: "pointer" }}
              />
              <AiFillInstagram
                size={25}
                style={{ marginLeft: "15px", cursor: "pointer" }}
              />
              <AiFillYoutube
                size={25}
                style={{ marginLeft: "15px", cursor: "pointer" }}
              />
            </div>
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Company</h1>
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                  text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Shop</h1>
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                  text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Support</h1>
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </footer>
      <div className="sticky bottom-0 block 800px:hidden bg-white z-[9] border-t border-solid">
        <div className="flex items-center justify-around gap-2">
          <SearchIcon containerStyle={"w-full justify-center py-2"} />
          <div
            className={`flex items-center w-full justify-center border-l border-r border-solid border-grey-200 py-2`}
          >
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

          <div className={`flex items-center w-full justify-center py-2`}>
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
    </>
  );
};

export default Footer;

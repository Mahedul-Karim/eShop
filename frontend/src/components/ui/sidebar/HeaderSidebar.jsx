import React from "react";
import SearchBar from "../SearchBar";
import { RxCross1 } from "react-icons/rx";
import Nav from "../../nav/Nav";
import { Link } from "react-router-dom";
import styles from "../../../util/style";
import { IoIosArrowForward } from "react-icons/io";
import SellerLink from "../SellerLink";

function HeaderSidebar({ setOpen, activePage }) {
  return (
    <>
      <div className="w-full justify-between flex pr-3 items-center mx-3">
        <SellerLink />
        <RxCross1
          size={30}
          className="ml-4 mt-5"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="my-5 px-4">
        <SearchBar width={"85%"} />
      </div>

      <Nav activePage={activePage} />
      <br />
      <br />
      <br />
    </>
  );
}

export default HeaderSidebar;

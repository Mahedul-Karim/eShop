import React from "react";
import SearchBar from "../SearchBar";
import { RxCross1 } from "react-icons/rx";
import Nav from "../../nav/Nav";
import SellerLink from "../SellerLink";

function HeaderSidebar({ setOpen, activePage }) {
  return (
    <>
      <div className="w-full justify-between flex pr-3 items-center mx-3 flex-row-reverse">
        
        <RxCross1
          size={30}
          className="ml-4 mt-5"
          onClick={() => setOpen(false)}
        />
      </div>
      

      <Nav activePage={activePage} />
      <br />
      <br />
      <br />
      <div className="flex items-center justify-center">

      <SellerLink />
      </div>
    </>
  );
}

export default HeaderSidebar;

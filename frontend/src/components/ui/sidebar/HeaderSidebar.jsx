import React from "react";
import { RxCross1 } from "react-icons/rx";
import Nav from "../../nav/Nav";
import SellerLink from "../SellerLink";

function HeaderSidebar({ setOpen }) {
  return (
    <>
      <div className="w-full justify-between flex pr-6 items-center mx-3 flex-row-reverse">
        <RxCross1
          size={30}
          className="ml-4 mt-5"
          onClick={() => setOpen(false)}
        />
      </div>

      <Nav setOpen={setOpen} />
    </>
  );
}

export default HeaderSidebar;

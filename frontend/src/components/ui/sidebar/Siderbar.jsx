import React from "react";
import HeaderSidebar from "./HeaderSidebar";

function Siderbar({ open, setOpen, setOpenWishlist }) {
  return (
    <div
      className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        className={`fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll ${
          open ? "translate-x-0" : "-translate-x-[100%]"
        } transition-all duration-800`}
      >
        <HeaderSidebar setOpen={setOpen} setOpenWishlist={setOpenWishlist} />
      </div>
    </div>
  );
}

export default Siderbar;

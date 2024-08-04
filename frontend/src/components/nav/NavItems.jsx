import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../util/data";

const NavItems = ({ setOpen }) => {
  const location = useLocation();

  return (
    <div className={`block 800px:flex items-center h-full w-full`}>
      {navItems &&
        navItems.map((i, index) => (
          <div
            className={`flex items-center justify-center h-full relative my-4 800px:my-0 ${
              location.pathname === i.url
                ? "bg-primary rounded-md 800px:rounded-none 800px:bg-transparent 800px:border-b-[2px] border-solid border-primary py-2 800px:py-0"
                : ""
            }`}
            key={index}
            onClick={() => {
              if (setOpen) {
                setOpen(false);
              }
            }}
          >
            <Link
              to={i.url}
              className={`${
                location.pathname === i.url
                  ? "text-white 800px:text-primary"
                  : "text-black"
              }  800px:pb-0 font-[500] px-6 cursor-pointer block`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavItems;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../util/data";
import styles from "../../util/style";

const NavItems = () => {
  const location = useLocation();

  return (
    <div className={`block 800px:${styles.noramlFlex} h-full`}>
      {navItems &&
        navItems.map((i, index) => (
          <div
            className={`flex items-center h-full relative ${
              location.pathname === i.url
                ? "800px:border-b-[2px] border-solid border-primary"
                : ""
            }`}
            key={index}
          >
            <Link
              to={i.url}
              className={`${
                location.pathname === i.url ? "text-primary" : "text-black"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer block`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavItems;

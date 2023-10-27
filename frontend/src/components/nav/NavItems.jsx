import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../util/data";
import styles from "../../util/style";

const NavItems = ({ activePage }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex} h-full`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className={`flex items-center h-full relative ${activePage === index+1 ? '800px:border-b-[2px] border-solid border-primary' : ''}`} key={index}>
            <Link
              to={i.url}
              className={`${
                activePage === index + 1 ? "text-primary" : "text-black"
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

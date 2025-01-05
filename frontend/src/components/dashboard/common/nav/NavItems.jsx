import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ navLinks, pathname }) => {
  return (
    <div className="flex flex-col gap-4 pl-3 mt-5 relative">
      {navLinks.map((nav, index) => (
        <div
          className={`py-2 md:pl-3 rounded-tl-[20px] rounded-bl-[20px] z-[2] transition-all  ${
            pathname === nav.to ? "text-primary activeNav" : "text-white"
          }`}
          key={index}
        >
          <Link to={nav.to} className={`flex items-center gap-2`}>
            <nav.Icon className="text-[25px]" />
            <h5 className={`hidden md:block text-[18px]`}>
              {nav.label}
            </h5>
          </Link>
        </div>
      ))}
      <div className="absolute bg-white py-5 md:py-6 rounded-tl-[20px] rounded-bl-[20px] -left-[70px] md:left-3 right-0 indicator -top-[3px] z-[1] transition-all duration-300" />
    </div>
  );
};

export default NavItems;

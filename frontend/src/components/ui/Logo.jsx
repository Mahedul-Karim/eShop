import React from "react";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
//#2C333F

function Logo({ classes, text1 ,text2  }) {
  return (
    <div className={classes}>
      <Link to="/" className={`font-semibold font-sans  ${text1 ? text1 : 'text-primary'} flex items-center`}>
      <span>
        <IoBagOutline className="text-[26px] "/>
      </span>
        <div className="text-[24px] ">
          <span>e</span>
          <span>Shop</span>
        </div>
      </Link>
    </div>
  );
}

export default Logo;

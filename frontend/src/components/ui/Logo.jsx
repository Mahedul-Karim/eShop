import React from "react";
import { Link } from "react-router-dom";

function Logo({ classes, text1 = "", text2 = "" }) {
  return (
    <div className={classes}>
      <Link to="/" className="text-3xl font-[600]">
        <span
          className={`text-primary text-[40px] inline-block -rotate-[35deg] ${text1}`}
        >
          e
        </span>
        <span className={`font-Roboto ${text2}`}>Shop</span>
      </Link>
    </div>
  );
}

export default Logo;

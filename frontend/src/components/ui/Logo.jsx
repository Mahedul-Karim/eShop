import React from "react";
import { Link } from "react-router-dom";

function Logo({ classes }) {
  return (
    <div className={classes}>
      <Link to="/" className="text-3xl font-[600]">
        <span className="text-primary text-[40px]">e</span>
        <span className="font-Roboto">Shop</span>
        {/* <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt=""
        /> */}
      </Link>
    </div>
  );
}

export default Logo;

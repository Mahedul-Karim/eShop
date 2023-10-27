import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SellerLink() {
  const { isSellerLoggedIn } = useSelector((state) => state.seller);
  return (
    <div>
      <Link
        className="flex items-center text-primary font-[500] gap-1 transition-all group text-[17px]"
        to={"/shop-create"}
      >
        <span className="group-hover:-translate-x-1 transition-all">
          {!isSellerLoggedIn ? "Become seller" : "Dashboard"}
        </span>
        <span className="group-hover:translate-x-1 transition-all">
          <BsChevronRight style={{ strokeWidth: 2 }} />
        </span>
      </Link>
    </div>
  );
}

export default SellerLink;

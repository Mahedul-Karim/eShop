import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SellerLink() {
  const { isSellerLoggedIn } = useSelector((state) => state.seller);
  return (
    <div>
      <Link
        className="flex items-center text-white bg-secondary font-[500] gap-1 transition-all group text-[14px] p-2 rounded-md"
        to={"/shop-create"}
      >
        <span>
          {!isSellerLoggedIn ? "Become seller" : "Dashboard"}
        </span>
        <span>
          <BsChevronRight style={{ strokeWidth: 2 }} />
        </span>
      </Link>
    </div>
  );
}

export default SellerLink;

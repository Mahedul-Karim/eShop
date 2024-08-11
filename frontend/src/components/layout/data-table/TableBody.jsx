import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { status } from "../../../util/data";

const TableBody = ({ order, link, inAdmin }) => {
  const { bg, text } = status[order?.status?.toLowerCase()?.replace(/ /g, "")];

  return (
    <>
      <div className="flex md:block items-center justify-between gap-2 text-ellipsis md:w-[70%] lg:w-full max-w-full overflow-hidden">
        <span className="font-semibold md:hidden inline-block">Id:</span>
        {order._id}
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-0">
        <p className="font-semibold md:hidden inline-block">Status:</p>
        <p
          className={`flex items-center justify-center uppercase font-semibold w-fit px-2 md:px-4 rounded-full py-[0.5px] md:py-1 text-[10px] md:text-[11px] ${bg} ${text} whitespace-nowrap max-w-full`}
        >
          {order.status}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-0">
        <span className="font-semibold md:hidden inline-block">Quantity:</span>
        {order.cart.length}
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-0">
        <span className="font-semibold md:hidden inline-block">Total:</span>$
        {order.totalPrice}
      </div>
      {!inAdmin ? (
        <Link
          to={link}
          className="mt-2 md:mt-0 flex justify-end md:justify-normal"
        >
          <FaArrowRight />
        </Link>
      ) : (
        <div className="flex items-center justify-between mt-2 md:mt-0">
          <p className="font-semibold md:hidden inline-block">Placed At:</p>
          <p>
            {new Date(order?.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </>
  );
};

export default TableBody;

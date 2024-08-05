import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../layout/data-table/Table";
import { FaArrowRight } from "react-icons/fa";
import TableBody from "../layout/data-table/TableBody";

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);

  const eligibleOrders =
    orders && orders.filter((o) => o.status === "Processing Refund");

  return (
    <>
      {eligibleOrders.length > 0 ? (
        <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
          <Table extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100">
            <div>Order Id</div>
            <div>Status</div>
            <div className="md:block hidden">Quantity</div>
            <div>Total</div>
            <div></div>
          </Table>
          {eligibleOrders.map((order, id) => {
            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={order._id}
              >
                <TableBody order={order} link={`/user/order/${order._id}`}/>
                
              </Table>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>You currently dont have any refund process!</p>
        </div>
      )}
    </>
  );
};
export default AllRefundOrders;

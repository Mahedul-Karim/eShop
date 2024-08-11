import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../layout/data-table/Table";
import TableBody from "../layout/data-table/TableBody";

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing Refund" || item.status === "Refund Success"
    );

 
  return (
    <>
      {refundOrders.length > 0 ? (
        <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
          <Table extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100">
            <div>Order Id</div>
            <div>Status</div>
            <div className="md:block hidden">Quantity</div>
            <div>Total</div>
            <div></div>
          </Table>
          {refundOrders.map((order, id) => {
            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={order._id}
              >
                <TableBody order={order} link={`/order/${order._id}`} />
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

import React from "react";
import Table from "../../../layout/data-table/Table";
import TableBody from "../../../layout/data-table/TableBody";

const Orders = ({ adminOrders }) => {
  return (
    <>
      {adminOrders.length > 0 ? (
        <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
          <Table extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100">
            <div>Order Id</div>
            <div>Status</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Date</div>
          </Table>
          {adminOrders.map((order, id) => {
            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={order._id}
              >
                <TableBody order={order} inAdmin />
              </Table>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>No Orders were found!!</p>
        </div>
      )}
    </>
  );
};

export default Orders;

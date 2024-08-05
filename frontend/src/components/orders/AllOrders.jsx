import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../hooks/useToast";
import { orderActions } from "../../store/orderSlice";
import Table from "../layout/data-table/Table";
import { FaArrowRight } from "react-icons/fa";
import { status } from "../../util/data";
import TableBody from "../layout/data-table/TableBody";

const AllOrders = () => {
  const { token } = useSelector((state) => state.auth);

  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [isLoading, fetchData] = useHttp();

  const { error } = useToast();

  useEffect(() => {
    const allOrders = async function () {
      try {
        const data = await fetchData("order", "GET", {
          authorization: `Bearer ${token}`,
        });

        dispatch(orderActions.orderRequestSuccess(data.order));
      } catch (err) {
        error(err.message);
      }
    };

    allOrders();
  }, []);

  console.log(orders);

  //bg-silver-100,text-silver-700
  return (
    <>
      {orders.length > 0 ? (
        <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
          <Table extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100">
            <div>Order Id</div>
            <div>Status</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
          </Table>
          {orders.map((order, id) => {
            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={order._id}
              >
                <TableBody order={order} link={`/user/order/${order._id}`} />
              </Table>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>You have not placed any order!</p>
        </div>
      )}
    </>
  );
};
export default AllOrders;

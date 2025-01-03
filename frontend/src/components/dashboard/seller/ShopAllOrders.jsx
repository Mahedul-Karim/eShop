import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { orderActions } from "../../../store/orderSlice";
import { useToast } from "../../hooks/useToast";
import Loading from "../common/Loading";
import TableBody from "../../layout/data-table/TableBody";
import Table from "../../layout/data-table/Table";

const ShopAllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { sellerToken } = useSelector((state) => state.seller);

  const [isLoading, fetchData] = useHttp();

  const dispatch = useDispatch();

  const { error } = useToast();

  useEffect(() => {
    const allOrders = async function () {
      try {
        const data = await fetchData("order/shop", "GET", {
          authorization: `Bearer ${sellerToken}`,
        });

        dispatch(orderActions.orderRequestSuccess(data.order));
      } catch (err) {
        console.log(err.message);
      }
    };

    allOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : orders.length > 0 ? (
        <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
          <Table
            extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100"
          >
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
                <TableBody order={order} link={`/order/${order._id}`} />
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

export default ShopAllOrders;

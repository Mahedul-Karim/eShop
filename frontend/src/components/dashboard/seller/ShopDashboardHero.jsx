import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../../util/style";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { productActions } from "../../../store/productSlice";
import { useToast } from "../../hooks/useToast";
import { orderActions } from "../../../store/orderSlice";
import Loading from "../common/Loading";
import Table from "../../layout/data-table/Table";
import TableBody from "../../layout/data-table/TableBody";

const ShopDashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller, sellerToken } = useSelector((state) => state.seller);
  const { product } = useSelector((state) => state.product);

  const [isLoading, fetchData] = useHttp();

  const { error } = useToast();

  const getProducts = async function () {
    try {
      const data = await fetchData(`product/${seller._id}`);

      dispatch(productActions.allProducts(data.product));
    } catch (err) {
      error(err.message);
    }
  };

  const allOrders = async function () {
    try {
      const data = await fetchData("order/shop", "GET", {
        authorization: `Bearer ${sellerToken}`,
      });

      dispatch(orderActions.orderRequestSuccess(data.order));
    } catch (err) {
      error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
    allOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full py-8">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="grid grid-cols-2 800px:grid-cols-3 gap-2 400px:gap-6">
            <div className="w-full max-h-full border border-solid rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  className="mr-2 400px:text-[30px] text-lg"
                  fill="#00000085"
                />
                <h3
                  className={`font-Roboto text-[#333] text-base 400px:text-[18px] leading-5 font-[400] text-[#00000085]`}
                >
                  Account Balance{" "}
                </h3>
              </div>
              <h5 className="pt-2 400px:pl-[36px] text-lg 400px:text-[22px] font-[500]">
                ${seller?.availableBalance?.toFixed(2)}
              </h5>
              <Link to="/seller/dashboard/withdraw-money">
                <h5 className="pt-4 pl-2 text-[#077f9c] 400px:text-base text-sm">
                  Withdraw Money
                </h5>
              </Link>
            </div>

            <div className="w-full max-h-full border border-solid rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear
                  className="mr-2 400px:text-[30px] text-lg"
                  fill="#00000085"
                />
                <h3
                  className={`font-Roboto text-[#333] text-base 400px:text-[18px] leading-5 font-[400] text-[#00000085]`}
                >
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 400px:pl-[36px] text-lg 400px:text-[22px] font-[500]">
                {orders && orders.length}
              </h5>
              <Link to="/seller/dashboard/orders">
                <h5 className="pt-4 pl-2 text-[#077f9c] 400px:text-base text-sm">
                  View Orders
                </h5>
              </Link>
            </div>

            <div className="w-full h-full border border-solid rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  className="mr-2 400px:text-[30px] text-lg"
                  fill="#00000085"
                />
                <h3
                  className={`font-Roboto text-[#333] text-base 400px:text-[18px] leading-5 font-[400] text-[#00000085]`}
                >
                  All Products
                </h3>
              </div>
              <h5 className="pt-2 400px:pl-[36px] text-lg 400px:text-[22px] font-[500]">
                {product && product.length}
              </h5>
              <Link to="/seller/dashboard/products">
                <h5 className="pt-4 pl-2 text-[#077f9c] 400px:text-base text-sm">
                  View Products
                </h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          {orders.length > 0 ? (
            <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
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
        </div>
      )}
    </>
  );
};

export default ShopDashboardHero;

import React, { useEffect, useState } from "react";
import {  AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { orderActions } from "../../../store/orderSlice";
import { sellerActions } from "../../../store/sellerSlice";
import Loading from "../common/Loading";
import Table from "../../layout/data-table/Table";
import TableBody from "../../layout/data-table/TableBody";
import Orders from "./common/Orders";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const [isLoading, fetchData] = useHttp();

  const { adminSeller } = useSelector((state) => state.seller);

  const { user, token } = useSelector((state) => state.auth);

  const { adminOrders } = useSelector((state) => state.order);

  useEffect(() => {
    const getAllOrders = async function () {
      const data = await fetchData("order/admin", "GET", {
        authorization: `Bearer ${token}`,
      });
      dispatch(orderActions.getAllOrders(data.orders));
    };

    const getAllSeller = async function () {
      const data = await fetchData("shop", "GET", {
        authorization: `Bearer ${token}`,
      });

      dispatch(sellerActions.getAllSeller(data.shops));
    };

    getAllSeller();
    getAllOrders();
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="grid 400px:grid-cols-2 800px:grid-cols-3 gap-2 400px:gap-6">
            <div className="w-full max-h-full border border-solid rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  className="mr-2 400px:text-[30px] text-lg"
                  fill="#00000085"
                />
                <h3
                  className={`font-Roboto text-[#333] text-base 400px:text-[18px] leading-5 font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 400px:pl-[36px] text-lg 400px:text-[22px] font-[500]">
                $ {adminEarning?.toFixed(2)}
              </h5>
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
                  All Sellers
                </h3>
              </div>
              <h5 className="pt-2 400px:pl-[36px] text-lg 400px:text-[22px] font-[500]">
                {adminSeller && adminSeller.length}
              </h5>
              <Link to="/admin/dashboard/sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c] 400px:text-base text-sm">
                  View Sellers
                </h5>
              </Link>
            </div>

            <div className="w-full max-h-full border border-solid rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  className="mr-2 400px:text-[30px] text-lg"
                  fill="#00000085"
                />
                <h3
                  className={`font-Roboto text-[#333] text-base 400px:text-[18px] leading-5 font-[400] text-[#00000085]`}
                >
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/admin/dashboard/orders">
                <h5 className="pt-4 pl-2 text-[#077f9c] 400px:text-base text-sm">
                  View Orders
                </h5>
              </Link>
            </div>
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>

          <Orders adminOrders={adminOrders} />
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;

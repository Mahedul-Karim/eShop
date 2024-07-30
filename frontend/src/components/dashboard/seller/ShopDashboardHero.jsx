import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../../util/style";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useHttp } from "../../hooks/useHttp";
import { productActions } from "../../../store/productSlice";
import { eventActions } from "../../../store/eventSlice";
import { useToast } from '../../hooks/useToast'
import { orderActions } from "../../../store/orderSlice";
import Loader from "../../../util/Loader";
import { sellerActions } from "../../../store/sellerSlice";

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
  }, [dispatch]);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.quantity, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Account Balance{" "}
                  <span className="text-[16px]">(with 10% service charge)</span>
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${seller?.availableBalance?.toFixed(2)}</h5>
              <Link to="/dashboard-withdraw-money">
                <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {orders && orders.length}
              </h5>
              <Link to="/dashboard-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Products
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {product && product.length}
              </h5>
              <Link to="/dashboard-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopDashboardHero;

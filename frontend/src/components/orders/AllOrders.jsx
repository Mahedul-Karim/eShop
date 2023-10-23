import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useHttp } from "../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { orderActions } from '../../store/orderSlice';


const AllOrders = () => {
  const { token } = useSelector((state) => state.auth);

  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [isLoading, fetchData] = useHttp();

  useEffect(() => {
    const allOrders = async function () {
      try {
        const data = await fetchData("order", "GET", {
          authorization: `Bearer ${token}`,
        });
        
        dispatch(orderActions.orderRequestSuccess(data.order))

      } catch (err) {
        toast.error(err.message);
      }
    };

    allOrders();
  }, []);

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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
export default AllOrders;

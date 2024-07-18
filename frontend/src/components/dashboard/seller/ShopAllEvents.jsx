import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventActions } from "../../../store/eventSlice";
import { BASE_URL } from "../../../util/base";
import Loader from "../../../util/Loader";
import toast from "react-hot-toast";

const ShopAllEvents = () => {
  const { event, isEventLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    const getEvents = async function () {
      try {
        dispatch(eventActions.eventRequest());
        const res = await fetch(`${BASE_URL}/event/${seller._id}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.message);
        }

        dispatch(eventActions.allevents(data.event));
      } catch (err) {
        toast.error(err.message);
      }
    };

    getEvents();
  }, [dispatch]);

  const handleDelete =async (id) => {
    try {
        dispatch(eventActions.eventRequest());
        const res = await fetch(`${BASE_URL}/event/${id}`,{
          method:'DELETE'
        });
  
        const data = await res.json();
        
        if (data.status === "failed") {
          throw new Error(data.message);
        }
  
        dispatch(eventActions.deleteevents(id));
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message);
      }
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  event &&
    event.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isEventLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default ShopAllEvents;

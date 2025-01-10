import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/useHttp";
import { orderActions } from "../../../store/orderSlice";
import { sellerActions } from "../../../store/sellerSlice";
import Dropdown from "../../ui/dropdown/Dropdown";

import { useToast } from "../../hooks/useToast";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller, sellerToken } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, fetchData] = useHttp();

  const { id } = useParams();

  const { success, error } = useToast();

  const data = orders && orders.find((item) => item._id === id);
  const [status, setStatus] = useState(data?.status);

  const orderUpdateHandler = async (e) => {
    try {
      const data = await fetchData(
        `order/shop/${id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${sellerToken}`,
        },
        JSON.stringify({ status })
      );

      dispatch(orderActions.updateOrder(data.order));
      dispatch(
        sellerActions.sellerRequestSuccess({
          seller: data.shop,
          sellerToken: data.token,
        })
      );
      localStorage.setItem(
        "seller",
        JSON.stringify({ seller: data.shop, sellerToken: data.token })
      );
      success("Order Updated");
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className={`py-4`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} className="text-primary" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={item._id}>
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80px] h-[80px] object-cover"
            />
            <div className="w-full">
              <h5 className="pl-3 text-base 400px:text-lg font-medium line-clamp-2">
                {item.name}
              </h5>
              <h5 className="pl-3 text-sm text-[#00000091]">
                US${item.price} x {item.quantity}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      {data?.status !== "Delivered" && (
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      )}
      {data?.status !== "Processing Refund" &&
        data?.status !== "Refund Success" &&
        data?.status !== "Delivered" && (
          <Dropdown
            value={status}
            className="border-[#7777774b] !text-base w-[280px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)+1,
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status) + 2
              )
              .map((option, index) => (
                <div onClick={() => setStatus(option)} key={index}>
                  {option}
                </div>
              ))}
          </Dropdown>
        )}
      {data?.status === "Processing Refund" ||
      data?.status === "Refund Success" ? (
        <Dropdown
          value={status}
          className="border-[#7777774b] !text-base w-[280px]"
        >
          {["Processing Refund", "Refund Success"]
            .slice(
              ["Processing Refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <div onClick={() => setStatus(option)} key={index}>
                {option}
              </div>
            ))}
        </Dropdown>
      ) : null}

      {data?.status !== "Delivered" && (
        <button
          className={`w-[150px]  my-3 flex items-center justify-center mt-5 bg-primary !rounded-[4px] disabled:bg-primary/[0.4] text-white font-[600] !h-[45px] text-[18px]`}
          onClick={orderUpdateHandler}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Status"}{" "}
        </button>
      )}
    </div>
  );
};

export default OrderDetails;

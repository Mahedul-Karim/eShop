import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useHttp } from "../hooks/useHttp";
import { useToast } from "../hooks/useToast";
import { productActions } from "../../store/productSlice";
import { orderActions } from "../../store/orderSlice";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  const { success,error } = useToast();

  const [_, fetchData] = useHttp();

  const data = orders && orders?.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    try {
      const data = await fetchData(
        "product/review",
        "POST",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          user,
          productId: selectedItem._id,
          rating,
          comment,
          orderId: id,
        })
      );
      setOpen(false);
      setRating(1);
      setComment("");
      dispatch(productActions.updateProductReview(data.product));
      success("Review submitted");
    } catch (err) {
      error(err.message);
    }
  };

  const refundHandler = async () => {

    try {
      const data = await fetchData(
        `order/shop/${id}`,
        "PUT",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({
         status:'Processing Refund'
        })
      );
      dispatch(orderActions.updateOrder(data.order));
      success(data.message);
    } catch (err) {
      error(err.message);
    }


  };

  return (
    <div className={`py-4 min-h-screen w-11/12 mx-auto`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
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
        data?.cart.map((item, index) => {
          return (
            <div className="w-full flex items-start mb-5" key={item._id}>
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-[80x] h-[80px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>
              {!item.isReviewed && data?.status === "Delivered" ? (
                <div
                  className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff]`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </div>
              ) : null}
            </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.quantity}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

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
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          <br />
          {data?.status === "Delivered" && (
            <div
              className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;

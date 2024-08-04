import { useEffect, useState } from "react";

const CartData = ({
  handleSubmit,
  couponCode,
  setCouponCode,
  totalPrice,
  subTotalPrice,
  discountPercentage,
  cart,
}) => {
  const [orderData, setOrderData] = useState([]);

  console.log(cart);

  useEffect(() => {
    if (localStorage.getItem("latestOrder")) {
      setOrderData(JSON.parse(localStorage.getItem("latestOrder")));
    }
  }, []);

  return (
    <div className="w-full bg-[#fff] rounded-md pb-8">
      <div className="mb-8 flex flex-col gap-2">
        {cart &&
          cart.map((data, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <img
                  src={data?.images?.[0].url}
                  alt=""
                  className="w-[54px] h-[54px] object-contain bg-white"
                />
                <p className="text-sm line-clamp-1">{data?.name}</p>
              </div>
              <p className="text-sm">
                ${data?.price}
                <span className="text-xs text-gray-500 ml-2">
                  x{data?.quantity}
                </span>
              </p>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          ${orderData?.subTotalPrice ? orderData.subTotalPrice : subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${0}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - $
          {orderData?.discountPercentage
            ? orderData.discountPercentage
            : discountPercentage}
        </h5>
      </div>
      <div className="flex items-center justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice ? orderData.totalPrice : totalPrice}
      </h5>
      </div>
      <br />
      {orderData?.length !== 0 && orderData ? (
        ""
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`w-full border p-1 rounded-[5px] h-[40px] pl-2`}
            placeholder="Coupoun code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
          <button
            className={`w-full h-[40px] border border-primary text-center text-primary rounded-[3px] mt-8`}
            type="submit"
          >
            Apply Code
          </button>
        </form>
      )}
    </div>
  );
};
export default CartData;

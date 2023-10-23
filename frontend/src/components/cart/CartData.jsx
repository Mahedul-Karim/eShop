import styles from "../../util/style";

const CartData = ({
  handleSubmit,
  couponCode,
  setCouponCode,
  totalPrice,
  subTotalPrice,
  discountPercentage,
  shipping,
  orderData
}) => {
  
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice ? orderData.subTotalPrice : subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.shipping ? orderData.shipping?.toFixed(2) : shipping?.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">- ${orderData?.discountPercentage ? orderData.discountPercentage : discountPercentage}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${orderData?.totalPrice ? orderData.totalPrice : totalPrice}</h5>
      <br />
      {orderData?.length !==0 && orderData ? '' : <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>}
    </div>
  );
};
export default CartData;

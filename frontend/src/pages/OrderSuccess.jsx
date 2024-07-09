import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const Success = () => {
  return (
    <div>
      {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

const OrderSuccessPage = () => {
  return (
    <div>
      <Success />
    </div>
  );
};

export default OrderSuccessPage;

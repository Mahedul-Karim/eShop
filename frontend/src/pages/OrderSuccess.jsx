import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Lottie from "react-lottie";
import animationData from '/assets/107043-success.json?url';

const Success = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div>
        <Lottie options={defaultOptions} width={300} height={300} />
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
      <Header />
      <Success />
      <Footer />
    </div>
  );
};



export default OrderSuccessPage;
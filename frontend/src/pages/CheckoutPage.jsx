import React from "react";
import Header from "../components/layout/Header";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Checkout from "../components/checkout/Checkout";
import Footer from "../components/layout/Footer";

const CheckoutPage = () => {
  return (
    <div>
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
    </div>
  );
};

export default CheckoutPage;

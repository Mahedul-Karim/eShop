import React from "react";
import ShopDashboardHeader from "../../components/dashboard/seller/ShopDashboardHeader";
import Footer from "../../components/layout/Footer";
import OrderDetails from "../../components/dashboard/seller/OrderDetails";
import Container from "../../util/Container";

const ShopOrderDetails = () => {
  return (
    <>
      <ShopDashboardHeader />
      <Container styles={"font-sans"}>
        <OrderDetails />
      </Container>
      <Footer />
    </>
  );
};

export default ShopOrderDetails;

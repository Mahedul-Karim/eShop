import React from "react";
import UserOrderDetails from "../components/user/UserOrderDetails";
import Container from '../util/Container'

const OrderDetailsPage = () => {
  return (
    <Container styles={"py-4 font-sans"}>
      <UserOrderDetails />
    </Container>
  );
};

export default OrderDetailsPage;

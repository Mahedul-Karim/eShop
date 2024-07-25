import React, { useState } from "react";


import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import Container from "../../util/Container";
import TableGrid from "../ui/table/Grid";
import Empty from "../ui/table/Empty";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const total = cart.reduce(
    (a, c) =>
      a +
      (c.originalPrice
        ? c.originalPrice * c.quantity
        : c.discountPrice * c.quantity),
    0
  );
  return (
    <Container styles={"my-8"}>
      {cart.length !== 0 ? (
        <div className="min-h-[50vh]">
          <TableGrid
            extraClass={"border-b border-solid text-[#999] py-3 md:grid hidden"}
            isCart
          >
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
          </TableGrid>
          {cart.map((i, index) => (
            <CartItems key={index} data={i} index={index}/>
          ))}
        </div>
      ) : (
        <Empty text={"You have not added any product to the cart!!"} />
      )}
    </Container>
    
  );
};

export default Cart;

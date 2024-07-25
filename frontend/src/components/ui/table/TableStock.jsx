import React from "react";
import CartQuantity from "../../cart/CartQuantity";

const TableStock = ({ isCart = false, stock, count, onClick1, onClick2 }) => {
  return (
    <>
      {!isCart ? (
        <p
          className={`hidden md:block ${
            stock > 0 ? "text-green-500" : "text-primary"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of stock"}
        </p>
      ) : (
        <CartQuantity
          extraClass={"hidden md:flex"}
          count={count}
          onClick1={onClick1}
          onClick2={onClick2}
        />
      )}
    </>
  );
};

export default TableStock;

import React from "react";
import CartQuantity from "../../cart/CartQuantity";

const TableMobilePricing = ({
  isCart = false,
  price,
  stock,
  onClick,
  onClick1,
  onClick2,
  total,
  count
}) => {
  return (
    <div className="flex flex-col gap-4 md:hidden mt-6 400px:text-base text-sm">
      <div className={`flex justify-between gap-3 basis-[50%]`}>
        <div className="flex items-center gap-10">
          <p className="font-bold">Price:</p>
          <p>${price}</p>
        </div>
        <div className="flex items-center gap-10">
          {!isCart ? (
            <>
              <p className="font-bold">Stock:</p>
              <p className={`${stock > 0 ? "text-green-500" : "text-primary"}`}>
                {stock > 0 ? "In Stock" : "Out of stock"}
              </p>
            </>
          ) : (
            <>
              <p className="font-bold">Total:</p>
              <p>${total}</p>
            </>
          )}
        </div>
      </div>
      {!isCart ? (
        <button
          className="border border-solid border-primary w-max h-6 px-4 py-3 flex items-center justify-center rounded-md text-primary self-end"
          onClick={onClick}
        >
          Add to Cart
        </button>
      ) : (
        <CartQuantity
          extraClass={"flex self-end"}
          count={count}
          onClick1={onClick1}
          onClick2={onClick2}
        />
      )}
    </div>
  );
};

export const TablePricing = ({ price }) => {
  return <div className="hidden md:block">${price}</div>;
};

export default TableMobilePricing;

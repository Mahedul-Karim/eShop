import React, { useState } from "react";
import { cartAction } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import TableStock from "../ui/table/TableStock";
import TableMobilePricing, { TablePricing } from "../ui/table/TablePricing";
import TableDetails from "../ui/table/TableDetails";
import TableGrid from "../ui/table/Grid";
import TableActions from "../ui/table/TableActions";

const CartItems = ({ data, index }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data?.price * data?.quantity;

  const dispatch = useDispatch();

  const handleCartRemove = function (id) {
    dispatch(cartAction.removeCartItem(id));
  };

  const handleQuantityIncrease = function (product) {
    dispatch(
      cartAction.addToCart({
        ...product,
        quantity: data.stock > data.quantity ? 1 : 0,
      })
    );
  };
  const handleQuantityDecrese = function (product) {
    dispatch(
      cartAction.removeCartQuantity({
        ...product,
        quantity: data.quantity > 1 ? 1 : 0,
      })
    );
  };

  return (
    <TableGrid
      isCart={true}
      extraClass={`${
        index === 0 && "border-t md:border-t-0"
      } border-b border-solid py-5 items-center`}
    >
      <TableDetails
        src={data?.images?.[0].url}
        onClick={() => handleCartRemove(data._id)}
      >
        {data?.name}
      </TableDetails>
      <TableMobilePricing
        isCart
        price={data?.price}
        total={totalPrice}
        count={data?.quantity}
        onClick1={() => handleQuantityDecrese(data)}
        onClick2={() => handleQuantityIncrease(data)}
      />
      <TablePricing price={data?.price} />
      <TableStock
        isCart
        count={data?.quantity}
        onClick1={() => handleQuantityDecrese(data)}
        onClick2={() => handleQuantityIncrease(data)}
      />
      <TablePricing price={totalPrice} />
      <TableActions isCart onClick2={() => handleCartRemove(data._id)} />
    </TableGrid>
  );
};
export default CartItems;

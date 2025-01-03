import React, { useEffect, useReducer, useState } from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Checkout from "../components/checkout/Checkout";
import Container from "../util/Container";
import { checkoutReducer } from "../reducers/reducers";
import { useToast } from "../components/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHttp } from "../components/hooks/useHttp";
import ShippingInfo from "../components/checkout/ShippingInfo";
import CartData from "../components/cart/CartData";
import Payment from "../components/payment/Payment";
import StripeRoutes from "../routes/StripeRoutes";

const initialState = {
  city: "",
  country: "",
  address1: "",
  address2: "",
  zipCode: null,
  couponCode: "",
  couponCodeData: null,
  discountPrice: null,
};

const CheckoutPage = () => {
  const [active, setActive] = useState(1);

  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const {
    city,
    country,
    address1,
    address2,
    zipCode,
    couponCode,
    couponCodeData,
    discountPrice,
  } = state;

  const setCity = (value) => {
    dispatch({ type: "CITY", payload: value });
  };
  const setCountry = (value) => {
    dispatch({ type: "COUNTRY", payload: value });
  };
  const setAddress1 = (value) => {
    dispatch({ type: "ADDRESS1", payload: value });
  };
  const setAddress2 = (value) => {
    dispatch({ type: "ADDRESS2", payload: value });
  };
  const setZipCode = (value) => {
    dispatch({ type: "ZIPCODE", payload: value });
  };
  const setCouponCode = (value) => {
    dispatch({ type: "COUPON_CODE", payload: value });
  };
  const setCouponCodeData = (value) => {
    dispatch({ type: "COUPON_CODE_DATA", payload: value });
  };
  const setDiscountPrice = (value) => {
    dispatch({ type: "DISCOUNT_PRICE", payload: value });
  };

  const { error } = useToast();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [isLoading, fetchData] = useHttp();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountPercentage = couponCodeData ? discountPrice : 0;

  const totalPrice = discountPercentage
    ? subTotalPrice - discountPercentage
    : subTotalPrice;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  const paymentSubmit = function () {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      return error("Please choose your delivery address!");
    }
    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country,
      city,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      discountPercentage,
      shippingAddress,
      user,
    };

    // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    setActive(2);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const data = await fetchData(`coupon/shop/${couponCode}`);

      const validProduct =
        cart && cart.filter((c) => c.shopId === data.coupon.shop);

      if (validProduct.length === 0) {
        throw new Error("This coupon is not eligible for this product");
      }

      setDiscountPrice(data.coupon.value);
      setCouponCodeData(data.coupon);
      setCouponCode("");
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <Container styles={"my-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.5fr]"}>
      <div className="">
        <CheckoutSteps active={active} />

        {active === 1 && (
          <Checkout
            user={user}
            city={city}
            setCity={setCity}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            country={country}
            setCountry={setCountry}
            paymentSubmit={paymentSubmit}
          />
        )}
        {active === 2 && (
          <StripeRoutes>
            <Payment />
          </StripeRoutes>
        )}
      </div>
      <div className="w-full">
        <CartData
          cart={cart}
          handleSubmit={handleSubmit}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          totalPrice={totalPrice.toFixed(2)}
          subTotalPrice={subTotalPrice.toFixed(2)}
          discountPercentage={discountPercentage}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

export default CheckoutPage;

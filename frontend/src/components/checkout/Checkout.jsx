import React, { useState } from "react";
import styles from "../../util/style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ShippingInfo from "./ShippingInfo";
import CartData from "../cart/CartData";
import { useHttp } from "../hooks/useHttp";
import toast from "react-hot-toast";

const Checkout = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [_, fetchData] = useHttp();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const discountPercentage = couponCodeData
    ?  discountPrice
    : "";

  const shipping = subTotalPrice * 0.1;

  const totalPrice = discountPercentage
    ? subTotalPrice+ shipping -discountPercentage 
    : subTotalPrice + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = function () {
    if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === ""){
     return toast.error("Please choose your delivery address!")
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
      shipping,
      discountPercentage,
      shippingAddress,
      user,
    }

    // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
   
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const data = await fetchData(`coupon/shop/${couponCode}`);

      const validProduct =
        cart && cart.filter((c) => c.shopId === data.coupon.shopId);


      if(validProduct.length === 0){
        throw new Error('This coupon is not eligible for this product')
      }

      const validProductPrice = validProduct.reduce(
        (acc, p) => acc + (p.quantity * p.discountPrice),
        0
      );

      const discountedPrice = (validProductPrice * data.coupon.value) / 100;

      setDiscountPrice(discountedPrice);
      setCouponCodeData(data.coupon);
      setCouponCode("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
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
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            totalPrice={totalPrice.toFixed(2)}
            subTotalPrice={subTotalPrice.toFixed(2)}
            discountPercentage={discountPercentage}
            shipping={shipping}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

export default Checkout;

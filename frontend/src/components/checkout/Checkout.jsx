import React, { useReducer, useState } from "react";
import ShippingInfo from "./ShippingInfo";

const Checkout = ({
  user,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  country,
  setCountry,
  paymentSubmit,
}) => {
  return (
    <div className="w-full flex flex-col py-8">
      <div className="block 800px:flex">
        <div className="w-full">
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
          />
        </div>
      </div>
      <button
        className={`bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl self-start px-3`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </button>
    </div>
  );
};

export default Checkout;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";

function StripeRoutes({ children }) {
  const { stripe } = useSelector((state) => state.product);
  return (
    <>
      {stripe && (
        <Elements stripe={loadStripe(stripe)}>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </Elements>
      )}
    </>
  );
}

export default StripeRoutes;

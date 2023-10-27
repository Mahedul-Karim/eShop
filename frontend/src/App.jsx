import {  RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, Suspense } from "react";
import { userActions } from "./store/userSlice";
import { sellerActions } from "./store/sellerSlice";
import Loader from "./util/Loader";
import { eventActions } from "./store/eventSlice";
import { useHttp } from "./components/hooks/useHttp";
import { cartAction } from "./store/cartSlice";
import { productActions } from "./store/productSlice";
import { router } from "./routes/routes";

function App() {
  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  const { isSellerLoggedIn, isSellerLoading } = useSelector(
    (state) => state.seller
  );
  

  const [_, fetchData, error] = useHttp();

  const dispatch = useDispatch();

  const getStripeApi = async function () {
    try {
      const data = await fetchData(`payment/stripe/apikey`);

      
      dispatch(productActions.setApi(data.public))
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      dispatch(
        userActions.userRequestSuccess(JSON.parse(localStorage.getItem("user")))
      );
    }

    if (JSON.parse(localStorage.getItem("seller"))) {
      dispatch(
        sellerActions.sellerRequestSuccess(
          JSON.parse(localStorage.getItem("seller"))
        )
      );
    }

    if (localStorage.getItem("cartItems")) {
      dispatch(
        cartAction.allCart(JSON.parse(localStorage.getItem("cartItems")))
      );
    }

    const getEvents = async function () {
      const data = await fetchData("event");

      if (error) {
        return toast.error(error);
      }

      dispatch(eventActions.allevents(data.event));
    };

    getEvents();
    getStripeApi();
  }, []);

  return (
    <>
      {isLoading || isSellerLoading ? (
        <Loader />
      ) : (
        <>
          
          <RouterProvider router={router}/>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </>
  );
}

export default App;

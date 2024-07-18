import { RouterProvider } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


import "./App.css";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { userActions } from "./store/userSlice";
import { sellerActions } from "./store/sellerSlice";
import { eventActions } from "./store/eventSlice";
import { useHttp } from "./components/hooks/useHttp";
import { cartAction } from "./store/cartSlice";
import { productActions } from "./store/productSlice";
import { router } from "./routes/routes";

function App() {
  const [_, fetchData, error] = useHttp();

  const dispatch = useDispatch();

  const getStripeApi = async function () {
    try {
      const data = await fetchData(`payment/stripe/apikey`);

      dispatch(productActions.setApi(data.public));
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
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "5px 8px",
            backgroundColor: "#fff",
            color: "#243757",
            zIndex: 99999999,
          },
        }}
      />
    </>
  );
}

export default App;

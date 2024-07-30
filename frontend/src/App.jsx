import { RouterProvider } from "react-router-dom";


import "./App.css";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { userActions } from "./store/userSlice";
import { sellerActions } from "./store/sellerSlice";
import { eventActions } from "./store/eventSlice";
import { useHttp } from "./components/hooks/useHttp";
import Toast from './components/ui/Toast'
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
      console.log(err.message);
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

    const getEvents = async function () {
      const data = await fetchData("event");

      if (error) {
        return console.log(error);
      }

      dispatch(eventActions.allevents(data.event));
    };

    getEvents();
    getStripeApi();

   
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      
      <Toast />
    </>
  );
}

export default App;

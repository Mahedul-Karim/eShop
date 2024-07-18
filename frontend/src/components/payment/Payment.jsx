import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import CartData from "../cart/CartData";
import { useHttp } from "../hooks/useHttp";
import toast from "react-hot-toast";
import { cartAction } from '../../store/cartSlice';
import { useDispatch } from "react-redux";


const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const dispatch=useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [_, fetchData] = useHttp();

  useEffect(() => {
    if (localStorage.getItem("latestOrder")) {
      setOrderData(JSON.parse(localStorage.getItem("latestOrder")));
    }
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  //paypal
  const paypalPaymentHandler =async function (paymentData) {

    order.paymentInfo = {
      id: paymentData.payer_id,
      status: 'succeeded',
      type: "PayPal",
    };

    const orderData= await fetchData(
      "order",
      "POST",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      JSON.stringify(order)
    );
    setOpen(false);
    navigate("/order/success");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("latestOrder");
    dispatch(cartAction.emptyCart());

  };


  const onApprove = function (data, action) {
    return action.order.capture().then(details=>{
      const { payer } = details;

      let paymentInfo=payer;

      if(paymentInfo !== undefined){
        paypalPaymentHandler(paymentInfo)
      }
    })
  };

  const createOrder = function (data, action) {
    return action.order.create({
      purchase_units:[
        {
          description:'Fsfs',
          amount:{
            currency_code:'USD',
            value:orderData?.totalPrice
          }
        }
      ],
      application_context:{
        shipping_preference:'NO_SHIPPING'
      }
    }).then(orderId => orderId)
  };

  

  //stripe
  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  

  const paymentHandler = async function (e) {
    e.preventDefault();
    
    try {
      const data =await fetchData(
        "payment/stripe",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(paymentData)
      );
      
      const client_secret = data.client_secret;
        
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        return toast.error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "Credit Card",
        };
      }

     const orderData= await fetchData(
        "order",
        "POST",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify(order)
      );
      setOpen(false);
      navigate("/order/success");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("latestOrder");
      dispatch(cartAction.emptyCart());
    } catch (err) {
      
      toast.error(err.message);
    }
  };

  //code
  const codHandler =async function (e) {
    e.preventDefault();

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    try{
      const orderData= await fetchData(
        "order",
        "POST",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify(order)
      );
      
      setOpen(false);
      navigate("/order/success");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("latestOrder");
      dispatch(cartAction.emptyCart());
    }catch(err){
      toast.error(err.message)
    }



  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            codHandler={codHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Payment;

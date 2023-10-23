import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ActivePage from "./pages/auth/ActivePage";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, Suspense } from "react";
import { userActions } from "./store/userSlice";
import Home from "./pages/Home";

import Products from "./pages/Products";
import BestSelling from "./pages/BestSelling";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccess";
import ShopCreate from "./pages/ShopCreate";
import ActiveSeller from "./pages/ActiveSeller";
import ShopLogin from "./pages/ShopLogin";
import { sellerActions } from "./store/sellerSlice";
import ShopHome from "./pages/shop/ShopHome";
import ShopDashboard from "./components/shop/ShopDashboard";
import Loader from "./util/Loader";
import CreateProduct from "./pages/dashboard/CreateProduct";
import ShopProducts from "./pages/dashboard/ShopProducts";
import CreateEvent from "./pages/dashboard/CreateEvent";
import ShopEvents from "./pages/dashboard/ShopEvents";
import CreateCoupons from "./pages/dashboard/CreateCoupon";
import ShopPreviewPage from "./pages/shop/ShopPreviewPage";
import { eventActions } from "./store/eventSlice";
import { useHttp } from "./components/hooks/useHttp";
import { cartAction } from "./store/cartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShopOrders from "./pages/shop/ShopOrders";
import ShopOrdersDetails from "./pages/shop/ShopOrdersDetails";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopRefunds from "./pages/shop/ShopRefunds";
import ShopSettingPage from "./pages/shop/ShopSettingPage";
import ShopWithDrawMoneyPage from "./pages/shop/ShopWithdrawPage";
import ShopMessagesPage from "./pages/shop/ShopMessagesPage";
import UserInbox from "./components/user/UserInbox";
import AdminDashboardPage from "./pages/dashboard/admin/AdminDashboardPage";
import AdminDashboardUsers from "./pages/dashboard/admin/AdminDashboardUsers";
import AdminDashboardSellers from "./pages/dashboard/admin/AdminDashboardSellers";
import AdminDashboardOrders from "./pages/dashboard/admin/AdminDashboardOrders";
import AdminDashboardProducts from "./pages/dashboard/admin/AdminDashboardProducts";
import AdminDashboardEvents from "./pages/dashboard/admin/AdminDashboardEvents";
import AdminDashboardWithdraw from "./pages/dashboard/admin/AdminDashboardWithdraw";

function App() {
  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  const { isSellerLoggedIn, isSellerLoading } = useSelector(
    (state) => state.seller
  );
  const [stripeApi, setStripeApi] = useState("");

  const [_, fetchData, error] = useHttp();

  const dispatch = useDispatch();

  const getStripeApi = async function () {
    try {
      const data = await fetchData(`payment/stripe/apikey`);

      setStripeApi(data.public);
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
          <Routes>
            {/**product pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/best-selling" element={<BestSelling />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/**user */}

            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/user/order/:id"
              element={
                isLoggedIn ? <OrderDetailsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/user/track/order/:id"
              element={
                isLoggedIn ? <TrackOrderPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/inbox"
              element={isLoggedIn ? <UserInbox /> : <Navigate to="/login" />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activation" element={<ActivePage />} />

            {/**Admin */}
            <Route
              path="/admin/dashboard"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardPage />
                )
              }
            />
            <Route
              path="/admin-users"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardUsers />
                )
              }
            />
            <Route
              path="/admin-orders"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardOrders />
                )
              }
            />
            <Route
              path="/admin-sellers"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardSellers />
                )
              }
            />

            <Route
              path="/admin-products"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardProducts />
                )
              }
            />
            <Route
              path="/admin-events"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardEvents />
                )
              }
            />
            <Route
              path="/admin-withdraw-request"
              element={
                user && user.role !== "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminDashboardWithdraw />
                )
              }
            />
            {/**orders */}
            <Route
              path="/checkout"
              element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/order/success"
              element={
                isLoggedIn ? <OrderSuccessPage /> : <Navigate to="/login" />
              }
            />
            {/**shop */}
            <Route
              path="/shop-login"
              element={
                !isSellerLoggedIn ? (
                  <ShopLogin />
                ) : (
                  <Navigate to={`/dashboard`} />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isSellerLoggedIn ? (
                  <ShopSettingPage />
                ) : (
                  <Navigate to={`/dashboard`} />
                )
              }
            />
            <Route
              path="/shop-create"
              element={
                !isSellerLoggedIn ? (
                  <ShopCreate />
                ) : (
                  <Navigate to={`/dashboard`} />
                )
              }
            />
            <Route path="/seller" element={<ActiveSeller />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/shop-home/:shopId"
              element={
                isSellerLoggedIn ? <ShopHome /> : <Navigate to="/shop-login" />
              }
            />
            <Route path="/shop/preview/:shopId" element={<ShopPreviewPage />} />

            {/** seller dashboard */}
            <Route
              path="/dashboard"
              element={
                isSellerLoggedIn ? (
                  <ShopDashboard />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-messages"
              element={
                isSellerLoggedIn ? (
                  <ShopMessagesPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-withdraw-money"
              element={
                isSellerLoggedIn ? (
                  <ShopWithDrawMoneyPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-refunds"
              element={
                isSellerLoggedIn ? (
                  <ShopRefunds />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-create-product"
              element={
                isSellerLoggedIn ? (
                  <CreateProduct />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-create-event"
              element={
                isSellerLoggedIn ? (
                  <CreateEvent />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-events"
              element={
                isSellerLoggedIn ? (
                  <ShopEvents />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-products"
              element={
                isSellerLoggedIn ? (
                  <ShopProducts />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-orders"
              element={
                isSellerLoggedIn ? (
                  <ShopOrders />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/order/:id"
              element={
                isSellerLoggedIn ? (
                  <ShopOrdersDetails />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
            <Route
              path="/dashboard-coupons"
              element={
                isSellerLoggedIn ? (
                  <CreateCoupons />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />
          </Routes>
          {stripeApi && (
            <Elements stripe={loadStripe(stripeApi)}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    isLoggedIn ? <PaymentPage /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </Elements>
          )}
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

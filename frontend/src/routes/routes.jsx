import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/Main";
import Home from "../pages/Home";
import Fallback from "./Fallback";
import ProtectedRoutes from "./ProtectedRoutes";

import AdminRoutes from "./AdminRoutes";
import AdminDashboardPage from "../pages/dashboard/admin/AdminDashboardPage";
import AdminDashboardUsers from "../pages/dashboard/admin/AdminDashboardUsers";
import AdminDashboardOrders from "../pages/dashboard/admin/AdminDashboardOrders";
import AdminDashboardSellers from "../pages/dashboard/admin/AdminDashboardSellers";
import AdminDashboardProducts from "../pages/dashboard/admin/AdminDashboardProducts";
import AdminDashboardEvents from "../pages/dashboard/admin/AdminDashboardEvents";
import AdminDashboardWithdraw from "../pages/dashboard/admin/AdminDashboardWithdraw";
import AdminDashboardMain from '../components/dashboard/admin/AdminDashboardMain';

import SellerRoutes from "./SellerRoutes";
import ShopSettingPage from "../pages/shop/ShopSettingPage";
import ActiveSeller from "../pages/ActiveSeller";

import ShopHome from "../pages/shop/ShopHome";
import ShopPreviewPage from "../pages/shop/ShopPreviewPage";
import ShopDashboard from "../components/shop/ShopDashboard";

import ShopMessagesPage from "../pages/shop/ShopMessagesPage";
import ShopWithDrawMoneyPage from "../pages/shop/ShopWithdrawPage";
import ShopRefunds from "../pages/shop/ShopRefunds";
import CreateProduct from "../pages/dashboard/CreateProduct";
import CreateEvent from "../pages/dashboard/CreateEvent";
import ShopEvents from "../pages/dashboard/ShopEvents";
import ShopProducts from "../pages/dashboard/ShopProducts";
import ShopOrders from "../pages/shop/ShopOrders";
import ShopOrderDetails from "../pages/shop/ShopOrdersDetails";
import CreateCoupons from "../pages/dashboard/CreateCoupon";

import ShopDashboardHero from "../components/dashboard/seller/ShopDashboardHero";

//Global routes
const EventsPage = lazy(() => import("../pages/EventsPage"));
const FAQPage = lazy(() => import("../pages/FAQPage"));
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const Products = lazy(() => import("../pages/Products"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccess"));
const ShopLogin = lazy(() => import("../pages/ShopLogin"));
const ShopCreate = lazy(() => import("../pages/ShopCreate"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));
const OrderDetailsPage = lazy(() => import("../pages/OrderDetailsPage"));
const TrackOrderPage = lazy(() => import("../pages/TrackOrderPage"));
const Wishlist = lazy(() => import("../components/wishlist/WishList"));
const Cart = lazy(() => import("../components/cart/Cart"));
const ActivePage = lazy(() => import("../pages/auth/ActivePage"));

//User profile routes
const Profile = lazy(() => import("../pages/Profile"));
const ProfileContent = lazy(() => import("../components/user/ProfileContent"));
const AllOrders = lazy(() => import("../components/orders/AllOrders"));
const AllRefundOrders = lazy(() =>
  import("../components/orders/AllRefundOrders")
);
const UserInbox = lazy(() => import("../components/user/UserInbox"));
const TrackOrder = lazy(() => import("../components/orders/TrackOrder"));
const ChangePassword = lazy(() => import("../components/user/ChangePassword"));
const Address = lazy(() => import("../components/user/Address"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes>
            <CheckoutPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/order/success",
        element: (
          <ProtectedRoutes>
            <OrderSuccessPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/shop-login",
        element: <ShopLogin />,
      },
      {
        path: "/shop-create",
        element: <ShopCreate />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/user/order/:id",
        element: (
          <ProtectedRoutes to={"/login"}>
            <OrderDetailsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/user/track/order/:id",
        element: (
          <ProtectedRoutes to={"/login"}>
            <TrackOrderPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },

  {
    path: "/profile",
    element: (
      <Fallback>
        <ProtectedRoutes to={"/login"}>
          <Profile />
        </ProtectedRoutes>
      </Fallback>
    ),
    children: [
      {
        path: "/profile",
        element: <ProfileContent />,
        index: true,
      },
      {
        path: "/profile/orders",
        element: <AllOrders />,
      },
      {
        path: "/profile/refunds",
        element: <AllRefundOrders />,
      },
      {
        path: "/profile/inbox",
        element: <UserInbox />,
      },
      {
        path: "/profile/track-order",
        element: <TrackOrder />,
      },
      {
        path: "/profile/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/profile/address",
        element: <Address />,
      },
    ],
  },
  {
    path: "/seller/dashboard",
    element: (
      <SellerRoutes to={"/shop-login"}>
        <ShopDashboard />
      </SellerRoutes>
    ),
    children: [
      {
        path: "/seller/dashboard",
        element: <ShopDashboardHero />,
        index: true,
      },
      {
        path: "/seller/dashboard/messages",
        element: <ShopMessagesPage />,
      },
      {
        path: "/seller/dashboard/withdraw-money",
        element: <ShopWithDrawMoneyPage />,
      },
      {
        path: "/seller/dashboard/refunds",
        element: <ShopRefunds />,
      },
      {
        path: "/seller/dashboard/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/seller/dashboard/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/seller/dashboard/events",
        element: <ShopEvents />,
      },
      {
        path: "/seller/dashboard/products",
        element: <ShopProducts />,
      },
      {
        path: "/seller/dashboard/orders",
        element: <ShopOrders />,
      },
      {
        path: "/seller/dashboard/coupons",
        element: <CreateCoupons />,
      },
      {
        path: "/seller/dashboard/settings",
        element: <ShopSettingPage />,
      },
    ],
  },

  {
    path: "/activation",
    element: (
      <Fallback>
        <ActivePage />,
      </Fallback>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoutes>
        <AdminDashboardPage />
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboardMain />,
        index: true,
      },
      {
        path: "/admin/dashboard/users",
        element: <AdminDashboardUsers />,
      },
      {
        path: "/admin/dashboard/orders",
        element: <AdminDashboardOrders />,
      },
      {
        path: "/admin/dashboard/sellers",
        element: <AdminDashboardSellers />,
      },
      {
        path: "/admin/dashboard/products",
        element: <AdminDashboardProducts />,
      },
      {
        path: "/admin/dashboard/events",
        element: <AdminDashboardEvents />,
      },
      {
        path: "/admin/dashboard/withdraw-request",
        element: <AdminDashboardWithdraw />,
      },
    ],
  },

  {
    path: "/seller",
    element: <ActiveSeller />,
  },

  {
    path: "/shop-home/:shopId",
    element: (
      <SellerRoutes to="/shop-login" path={"login"}>
        <ShopHome />
      </SellerRoutes>
    ),
  },
  {
    path: "/shop/preview/:shopId",
    element: <ShopPreviewPage />,
  },

  {
    path: "/order/:id",
    element: (
      <SellerRoutes>
        <ShopOrderDetails />
      </SellerRoutes>
    ),
  },
]);

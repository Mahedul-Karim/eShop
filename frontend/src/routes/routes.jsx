import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import BestSelling from "../pages/BestSelling";
import EventsPage from "../pages/EventsPage";
import FAQPage from "../pages/FAQPage";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/Profile";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import TrackOrderPage from "../pages/TrackOrderPage";
import UserInbox from "../components/user/UserInbox";
import SignUp from "../pages/auth/SignUp";
import ActivePage from "../pages/auth/ActivePage";
import AdminRoutes from "./AdminRoutes";
import AdminDashboardPage from "../pages/dashboard/admin/AdminDashboardPage";
import AdminDashboardUsers from "../pages/dashboard/admin/AdminDashboardUsers";
import AdminDashboardOrders from "../pages/dashboard/admin/AdminDashboardOrders";
import AdminDashboardSellers from "../pages/dashboard/admin/AdminDashboardSellers";
import AdminDashboardProducts from "../pages/dashboard/admin/AdminDashboardProducts";
import AdminDashboardEvents from "../pages/dashboard/admin/AdminDashboardEvents";
import AdminDashboardWithdraw from "../pages/dashboard/admin/AdminDashboardWithdraw";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccess";
import SellerRoutes from "./SellerRoutes";
import ShopSettingPage from "../pages/shop/ShopSettingPage";
import ActiveSeller from "../pages/ActiveSeller";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ShopHome from "../pages/shop/ShopHome";
import ShopPreviewPage from "../pages/shop/ShopPreviewPage";
import ShopDashboard from "../components/shop/ShopDashboard";
import ShopLogin from "../pages/ShopLogin";
import ShopCreate from "../pages/ShopCreate";
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
import StripeRoutes from "./StripeRoutes";
import PaymentPage from "../pages/PaymentPage";
import Products from "../pages/Products";
import Main from "../pages/Main";
import Wishlist from "../components/wishlist/WishList";
import Cart from "../components/cart/Cart";

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
        path: "/best-selling",
        element: <BestSelling />,
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
      <ProtectedRoutes to={"/login"}>
        <Profile />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/inbox",
    element: (
      <ProtectedRoutes>
        <UserInbox />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/activation",
    element: <ActivePage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoutes>
        <AdminDashboardPage />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-users",
    element: (
      <AdminRoutes>
        <AdminDashboardUsers />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-orders",
    element: (
      <AdminRoutes>
        <AdminDashboardOrders />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-sellers",
    element: (
      <AdminRoutes>
        <AdminDashboardSellers />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-products",
    element: (
      <AdminRoutes>
        <AdminDashboardProducts />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-events",
    element: (
      <AdminRoutes>
        <AdminDashboardEvents />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin-withdraw-request",
    element: (
      <AdminRoutes>
        <AdminDashboardWithdraw />
      </AdminRoutes>
    ),
  },

  {
    path: "/settings",
    element: (
      <SellerRoutes>
        <ShopSettingPage />
      </SellerRoutes>
    ),
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
    path: "/dashboard",
    element: (
      <SellerRoutes to={"/shop-login"}>
        <ShopDashboard />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-messages",
    element: (
      <SellerRoutes>
        <ShopMessagesPage />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-withdraw-money",
    element: (
      <SellerRoutes to={"/shop-login"}>
        <ShopWithDrawMoneyPage />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-refunds",
    element: (
      <SellerRoutes>
        <ShopRefunds />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-create-product",
    element: (
      <SellerRoutes>
        <CreateProduct />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-create-event",
    element: (
      <SellerRoutes>
        <CreateEvent />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-events",
    element: (
      <SellerRoutes>
        <ShopEvents />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-products",
    element: (
      <SellerRoutes>
        <ShopProducts />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-orders",
    element: (
      <SellerRoutes>
        <ShopOrders />
      </SellerRoutes>
    ),
  },
  {
    path: "/order/:id",
    element: (
      <SellerRoutes>
        <ShopOrderDetails />
      </SellerRoutes>
    ),
  },
  {
    path: "/dashboard-coupons",
    element: (
      <SellerRoutes>
        <CreateCoupons />
      </SellerRoutes>
    ),
  },
  {
    path: "/payment",
    element: (
      <StripeRoutes>
        <PaymentPage />
      </StripeRoutes>
    ),
  },
]);

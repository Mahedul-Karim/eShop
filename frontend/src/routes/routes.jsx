import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/Main";
import Home from "../pages/Home";
import Fallback from "./Fallback";
import ProtectedRoutes from "./ProtectedRoutes";
import SellerRoutes from "./SellerRoutes";
import AdminRoutes from "./AdminRoutes";

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

//Shop routes
const ShopDashboard = lazy(() => import("../components/shop/ShopDashboard"));
const ShopDashboardHero = lazy(() =>
  import("../components/dashboard/seller/ShopDashboardHero")
);
const ShopMessagesPage = lazy(() => import("../pages/shop/ShopMessagesPage"));
const ShopWithDrawMoneyPage = lazy(() =>
  import("../pages/shop/ShopWithdrawPage")
);
const ShopRefunds = lazy(() => import("../pages/shop/ShopRefunds"));
const CreateProduct = lazy(() => import("../pages/dashboard/CreateProduct"));
const CreateEvent = lazy(() => import("../pages/dashboard/CreateEvent"));
const ShopEvents = lazy(() => import("../pages/dashboard/ShopEvents"));
const ShopProducts = lazy(() => import("../pages/dashboard/ShopProducts"));
const ShopOrders = lazy(() => import("../pages/shop/ShopOrders"));
const ShopOrderDetails = lazy(() => import("../pages/shop/ShopOrdersDetails"));
const CreateCoupons = lazy(() => import("../pages/dashboard/CreateCoupon"));
const ShopSettingPage = lazy(() => import("../pages/shop/ShopSettingPage"));
const ShopHome = lazy(() => import("../pages/shop/ShopHome"));
const ShopPreviewPage = lazy(() => import("../pages/shop/ShopPreviewPage"));
const ActiveSeller = lazy(() => import("../pages/ActiveSeller"));

//Admin routes
const AdminDashboardPage = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardPage")
);
const AdminDashboardUsers = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardUsers")
);
const AdminDashboardOrders = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardOrders")
);
const AdminDashboardSellers = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardSellers")
);
const AdminDashboardProducts = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardProducts")
);
const AdminDashboardEvents = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardEvents")
);
const AdminDashboardWithdraw = lazy(() =>
  import("../pages/dashboard/admin/AdminDashboardWithdraw")
);
const AdminDashboardMain = lazy(() =>
  import("../components/dashboard/admin/AdminDashboardMain")
);

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
    ],
  },

  {
    path: "/seller/dashboard",
    element: (
      <Fallback>
        <SellerRoutes to={"/shop-login"}>
          <ShopDashboard />
        </SellerRoutes>
      </Fallback>
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
      <Fallback>
        <AdminRoutes>
          <AdminDashboardPage />
        </AdminRoutes>
      </Fallback>
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
    element: (
      <Fallback>
        <ActiveSeller />,
      </Fallback>
    ),
  },

  {
    path: "/shop-home/:shopId",
    element: (
      <Fallback>
        <SellerRoutes to="/shop-login" path={"login"}>
          <ShopHome />
        </SellerRoutes>
      </Fallback>
    ),
  },
  {
    path: "/shop/preview/:shopId",
    element: (
      <Fallback>
        <ShopPreviewPage />,
      </Fallback>
    ),
  },

  {
    path: "/order/:id",
    element: (
      <Fallback>
        <SellerRoutes>
          <ShopOrderDetails />
        </SellerRoutes>
      </Fallback>
    ),
  },
]);

import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

export const ADMIN_DASHBOARD_NAV = [
  {
    to: "/admin/dashboard",
    Icon: RxDashboard,
    label: "Dashboard",
  },
  {
    to: "/admin/dashboard/orders",
    Icon: FiShoppingBag,
    label: "All Orders",
  },
  {
    to: "/admin/dashboard/sellers",
    Icon: GrWorkshop,
    label: "All Sellers",
  },
  {
    to: "/admin/dashboard/users",
    Icon: HiOutlineUserGroup,
    label: "All Users",
  },
  {
    to: "/admin/dashboard/products",
    Icon: BsHandbag,
    label: "All Products",
  },
  {
    to: "/admin/dashboard/events",
    Icon: MdOutlineLocalOffer,
    label: "All Events",
  },
  {
    to: "/admin/dashboard/withdraw-request",
    Icon: CiMoneyBill,
    label: "Withdraw Request",
  },
  {
    to: "/profile",
    Icon: AiOutlineSetting,
    label: "Setting",
  },
];

export const SELLER_DASHBOARD_NAV = [
  {
    to: "/seller/dashboard",
    Icon: RxDashboard,
    label: "Dashboard",
  },
  {
    to: "/seller/dashboard/orders",
    Icon: FiShoppingBag,
    label: "All Orders",
  },
  {
    to: "/seller/dashboard/products",
    Icon: FiPackage,
    label: "All Products",
  },
  {
    to: "/seller/dashboard/create-product",
    Icon: AiOutlineFolderAdd,
    label: "Create Product",
  },
  {
    to: "/seller/dashboard/events",
    Icon: MdOutlineLocalOffer,
    label: "All Events",
  },
  {
    to: "/seller/dashboard/create-event",
    Icon: VscNewFile,
    label: "Create Event",
  },
  {
    to: "/seller/dashboard/withdraw-money",
    Icon: CiMoneyBill,
    label: "Withdraw Money",
  },
  {
    to: "/seller/dashboard/messages",
    Icon: BiMessageSquareDetail,
    label: "Shop Inbox",
  },
  {
    to: "/seller/dashboard/coupons",
    Icon: AiOutlineGift,
    label: "Discount Codes",
  },
  {
    to: "/seller/dashboard/refunds",
    Icon: HiOutlineReceiptRefund,
    label: "Refunds",
  },
  {
    to: "/seller/dashboard/settings",
    Icon: CiSettings,
    label: "Settings",
  },
];

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Deals",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Fast & Secure Delivery",
    Description: "From all over world",
    icon: "/assets/service1.png",
  },
  {
    id: 2,
    title: "Money Back Guarantee",
    Description: "Within 10 days.",
    icon: "/assets/service2.png",
  },
  {
    id: 4,
    title: "24 Hour Return Policy",
    Description: "No question ask.",
    icon: "/assets/service3.png",
  },
  {
    id: 5,
    title: "Pro Quality Support",
    Description: "24/7 Live support.",
    icon: "/assets/service4.png",
  },
];

// categories data
export const categoriesData = [
  {
    id: 0,
    title: "All",
    subTitle: "",
    image_Url: "",
  },
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    image_Url: "/assets/category-1.png",
  },
  {
    id: 2,
    title: "Digital cameras",
    subTitle: "",
    image_Url: "/assets/category-2.png",
  },
  {
    id: 3,
    title: "Smart phones",
    subTitle: "",
    image_Url: "/assets/category-3.png",
  },
  {
    id: 4,
    title: "Televisions",
    subTitle: "",
    image_Url: "/assets/category-4.png",
  },
  {
    id: 5,
    title: "Audio",
    subTitle: "",
    image_Url: "/assets/category-5.png",
  },
  {
    id: 6,
    title: "Smart watches",
    subTitle: "",
    image_Url: "/assets/category-6.png",
  },
  {
    id: 7,
    title: "Others",
    subTitle: "",
    image_Url: "/assets/category-6.png",
  },
];

export const status = {
  delivered: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  shipping: {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  processing: {
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
  received: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  transferredtodeliverypartner: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  processingrefund: {
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  refundsuccess: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
};

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];

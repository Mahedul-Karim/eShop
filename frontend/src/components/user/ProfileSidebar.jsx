import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineLogin } from "react-icons/ai";
import {
  MdOutlineTrackChanges,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../util/base";
import { useToast } from "../hooks/useToast";
import { userActions } from "../../store/userSlice";

const USER_NAV_DATA = [
  {
    id: 1,
    Icon: RxPerson,
    label: "Profile",
    link: "/profile",
  },
  {
    id: 2,
    Icon: HiOutlineShoppingBag,
    label: "Orders",
    link: "/profile/orders",
  },
  {
    id: 3,
    Icon: HiOutlineReceiptRefund,
    label: "Refunds",
    link: "/profile/refunds",
  },
  {
    id: 4,
    Icon: AiOutlineMessage,
    label: "Inbox",
    link: "/profile/inbox",
  },
  {
    id: 5,
    Icon: MdOutlineTrackChanges,
    label: "Track Order",
    link: "/profile/track-order",
  },
  {
    id: 6,
    Icon: RiLockPasswordLine,
    label: "Change Password",
    link: "/profile/change-password",
  },
  {
    id: 7,
    Icon: TbAddressBook,
    label: "Address",
    link: "/profile/address",
  },
];

function ProfileSidebar({ active, setActive }) {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { success, error } = useToast();

  const dispatch = useDispatch();

  const handleLogout = async function () {
    setActive(8);
    const res = await fetch(`${BASE_URL}/user/logout`);
    const data = await res.json();
    localStorage.removeItem("user");
    dispatch(userActions.userLogOut());
    success(data.message);
    navigate("/");
  };

  const location = useLocation();

  return (
    <div className="w-full bg-white rounded-[10px] p-4 pt-8">
      {USER_NAV_DATA.map((nav) => {
        const { id, Icon, label } = nav;

        return (
          <Link
            className={`flex items-center gap-2 cursor-pointer w-full mb-4 py-2 sm:pl-3 rounded-md justify-center sm:justify-normal ${
              location.pathname === nav.link
                ? "bg-primary text-white"
                : "bg-none text-black"
            }`}
            key={id}
            to={nav.link}
          >
            <Icon size={20} />
            <span className={`sm:block hidden`}>{label}</span>
          </Link>
        );
      })}
      {user && user?.role === "admin" && (
        <Link to="/admin/dashboard">
          <div className="flex items-center gap-2 cursor-pointer w-full mb-4 py-2 sm:pl-3 rounded-md justify-center sm:justify-normal">
            <MdOutlineAdminPanelSettings size={20} />
            <span className={`sm:block hidden`}>Admin Dashboard</span>
          </div>
        </Link>
      )}
      <div
        className="flex items-center justify-center sm:justify-normal gap-2 cursor-pointer w-full mb-4 py-2 sm:pl-3 rounded-md"
        onClick={() => handleLogout()}
      >
        <AiOutlineLogin size={20} />
        <span className={`sm:block hidden`}>Log out</span>
      </div>
    </div>
  );
}

export default ProfileSidebar;

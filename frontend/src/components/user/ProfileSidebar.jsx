import { Link, useNavigate } from "react-router-dom";
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
  },
  {
    id: 2,
    Icon: HiOutlineShoppingBag,
    label: "Orders",
  },
  {
    id: 3,
    Icon: HiOutlineReceiptRefund,
    label: "Refunds",
  },
  {
    id: 4,
    Icon: AiOutlineMessage,
    label: "Inbox",
  },
  {
    id: 5,
    Icon: MdOutlineTrackChanges,
    label: "Track Order",
  },
  {
    id: 6,
    Icon: RiLockPasswordLine,
    label: "Change Password",
  },
  {
    id: 7,
    Icon: TbAddressBook,
    label: "Address",
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
    success(data.message)
    navigate("/");
  };

  return (
    <div className="w-full bg-white rounded-[10px] p-4 pt-8">
      {USER_NAV_DATA.map((nav) => {
        const { id, Icon, label } = nav;

        if(id === 4){
         return <div
            className={`flex items-center gap-2 cursor-pointer w-full mb-4 py-2 sm:pl-3 rounded-md justify-center sm:justify-normal ${
              active === id ? "bg-primary text-white" : "bg-none text-black"
            }`}
            key={id}
            onClick={() => navigate('/inbox')}
          >
            <Icon size={20} />
            <span className={`sm:block hidden`}>{label}</span>
          </div>
        }

        return (
          <div
            className={`flex items-center gap-2 cursor-pointer w-full mb-4 py-2 sm:pl-3 rounded-md justify-center sm:justify-normal ${
              active === id ? "bg-primary text-white" : "bg-none text-black"
            }`}
            key={id}
            onClick={() => setActive(id)}
          >
            <Icon size={20} />
            <span className={`sm:block hidden`}>{label}</span>
          </div>
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

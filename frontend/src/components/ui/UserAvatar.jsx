import React, { useRef, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { GoSignIn } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import SellerLink from "../ui/SellerLink";
import useOutsideClick from "../hooks/useOutsideClick";

function UserAvatar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const dropDownRef = useRef();

  useOutsideClick(dropDownRef, () => {
    setOpen(false);
  });
  return (
    <div ref={dropDownRef} className="relative">
      {/* <div className="border-t-0 border-b-background absolute border-l-transparent border-r-transparent border-l-[12px] border-r-[12px] border-b-[12px] border-solid rounded-[6px] top-[25px] right-[15px]" /> */}

      <button
        className="flex items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        {isLoggedIn ? (
          <img
            src={user?.avatar?.url}
            alt=""
            className="w-[35px] h-[35px] rounded-full "
          />
        ) : (
          <img
            src={"/assets/placeholder.png"}
            alt=""
            className="w-[30px] h-[30px] rounded-full "
          />
        )}
      </button>

      <div
        className={`absolute right-0 top-[45px] bg-white rounded-md border border-border border-solid flex flex-col text-[#717171] font-medium z-[10] [&>*:not(:first-child)]:py-2 [&>*:not(:first-child)]:px-4 w-max shadow-lg transition-all duration-[600ms] ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-[10px] opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`bg-white absolute rotate-45 w-6 h-6 border border-solid border-border -top-[11px] right-[20px] rounded-md -z-[10] border-r-transparent border-b-transparent`}
        />
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:bg-background border-b border-solid border-border"
          >
            <AiOutlineUser />
            Profile
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 hover:bg-background border-b border-solid border-border"
            >
              <GoSignIn />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 hover:bg-background border-b border-solid border-border"
            >
              <IoCreateOutline />
              Sign Up
            </Link>
          </>
        )}
        <div>
          <SellerLink />
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;

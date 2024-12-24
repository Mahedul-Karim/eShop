import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { GoSignIn } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import SellerLink from "../ui/SellerLink";

function UserAvatar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  return (
    <>
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
      {open && (
        <div
          className="absolute right-0 top-[35px] bg-white rounded-md border border-border border-solid flex flex-col text-[#717171] font-medium z-[10] [&>*]:py-2 [&>*]:px-4 w-max shadow-lg"
          onClick={() => setOpen(false)}
        >
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
      )}
    </>
  );
}

export default UserAvatar;

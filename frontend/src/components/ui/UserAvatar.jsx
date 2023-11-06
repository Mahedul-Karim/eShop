import React from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserAvatar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <>
      {isLoggedIn ? (
        <Link to="/profile">
          <img
            src={user?.avatar?.url}
            alt=""
            className="w-[40px] h-[40px] rounded-full "
          />
        </Link>
      ) : (
        <Link to="/login">
          <CgProfile
            size={30}
            style={{stroke:'black'}}
            className="hidden 800px:inline-block"
          />
          <span className="800px:hidden text-[18px] pr-[10px] text-[#000000b7]">
            Login
          </span>
        </Link>
      )}
    </>
  );
}

export default UserAvatar;

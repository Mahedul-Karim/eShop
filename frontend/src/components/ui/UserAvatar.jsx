import React from "react";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";


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
          <AiOutlineUser
            size={25}
           strokeWidth={'0.1px'}
            className="inline-block"
          />
          
        </Link>
      )}
    </>
  );
}

export default UserAvatar;

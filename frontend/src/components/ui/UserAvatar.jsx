import React from "react";
import { CiUser } from "react-icons/ci";
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
          <CiUser
            size={25}
            style={{stroke:'black',strokeWidth:'0.8px'}}
            className="inline-block"
          />
          
        </Link>
      )}
    </>
  );
}

export default UserAvatar;

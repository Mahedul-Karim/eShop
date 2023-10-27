import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, to,auth=false }) {
  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  if (isLoggedIn && !auth) {
    return  children ;
  }
  return <Navigate to={to || '/login'} />;
}

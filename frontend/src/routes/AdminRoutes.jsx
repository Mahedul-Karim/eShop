import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoutes({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user && user.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return  children ;
}

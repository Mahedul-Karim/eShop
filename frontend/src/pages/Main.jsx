import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Fallback from "../routes/Fallback";

const Main = () => {
  return (
    <>
      <Header />
      <Fallback>
        <Outlet />
      </Fallback>
      <Footer />
    </>
  );
};

export default Main;

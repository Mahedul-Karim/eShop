import React from "react";

import Logo from "../../ui/Logo";
import { useLocation } from "react-router-dom";
import NavItems from "./nav/NavItems";

const Sidebar = ({ navLinks }) => {
  const location = useLocation();

  return (
    <aside className="bg-primary py-4 h-full min-h-screen">
      <Logo
        classes={"flex items-center justify-center"}
        text1="!text-[#FEFEFE]"
        text2="md:block hidden"
      />
      <NavItems navLinks={navLinks} pathname={location.pathname} />
    </aside>
  );
};

export default Sidebar;

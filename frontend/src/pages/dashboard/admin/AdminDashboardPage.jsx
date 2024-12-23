import React from "react";

import Sidebar from "../../../components/dashboard/common/Sidebar";
import { ADMIN_DASHBOARD_NAV } from "../../../util/data";
import ShopDashboardHeader from "../../../components/dashboard/seller/ShopDashboardHeader";
import Container from "../../../util/Container";
import { Outlet } from "react-router-dom";
import Fallback from "../../../routes/Fallback";

const AdminDashboardPage = () => {
  return (
    <main className="grid grid-cols-[60px_1fr] md:grid-cols-[280px_1fr]">
      <Sidebar navLinks={ADMIN_DASHBOARD_NAV} />
      <div className="bg-[#FEFEFE]">
        <ShopDashboardHeader isAdmin />
        <Fallback>
          <Container styles="">
            <Outlet />
          </Container>
        </Fallback>
      </div>
    </main>
  );
};

export default AdminDashboardPage;

import React from "react";

import Sidebar from "../../../components/dashboard/common/Sidebar";
import { ADMIN_DASHBOARD_NAV } from "../../../util/data";
import ShopDashboardHeader from "../../../components/dashboard/seller/ShopDashboardHeader";
import Container from "../../../util/Container";
import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <main className="grid grid-cols-[60px_1fr] md:grid-cols-[280px_1fr] h-screen overflow-clip">
        <Sidebar navLinks={ADMIN_DASHBOARD_NAV} />
        <div className="bg-[#FEFEFE] h-full overflow-y-auto">
          <ShopDashboardHeader isAdmin />
          <Container styles="">
            <Outlet />
          </Container>
        </div>
      </main>
  );
};

export default AdminDashboardPage;
import { Outlet, useLocation } from "react-router-dom";
import ShopDashboardHeader from "../dashboard/seller/ShopDashboardHeader";

import Sidebar from "../dashboard/common/Sidebar";
import { SELLER_DASHBOARD_NAV } from "../../util/data";
import Container from "../../util/Container";

function ShopDashboard() {
  return (
    <>
      <main className="grid grid-cols-[60px_1fr] md:grid-cols-[280px_1fr] h-screen overflow-clip">
        <Sidebar navLinks={SELLER_DASHBOARD_NAV} />
        <div className="bg-[#FEFEFE] h-full overflow-y-auto">
          <ShopDashboardHeader />
          <Container styles="">
            <Outlet />
          </Container>
        </div>
      </main>
    </>
  );
}
export default ShopDashboard;

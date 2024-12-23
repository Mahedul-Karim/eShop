import { Outlet, useLocation } from "react-router-dom";
import ShopDashboardHeader from "../dashboard/seller/ShopDashboardHeader";

import Sidebar from "../dashboard/common/Sidebar";
import { SELLER_DASHBOARD_NAV } from "../../util/data";
import Container from "../../util/Container";
import Fallback from "../../routes/Fallback";

function ShopDashboard() {
  return (
    <>
      <main className="grid grid-cols-[60px_1fr] md:grid-cols-[280px_1fr]">
        <Sidebar navLinks={SELLER_DASHBOARD_NAV} />
        <div className="bg-[#FEFEFE]">
          <ShopDashboardHeader />
          <Fallback>
            <Container styles="">
              <Outlet />
            </Container>
          </Fallback>
        </div>
      </main>
    </>
  );
}
export default ShopDashboard;

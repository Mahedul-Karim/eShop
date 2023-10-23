import ShopDashboardHeader from "../dashboard/seller/ShopDashboardHeader";
import ShopDashboardHero from "../dashboard/seller/ShopDashboardHero";
import ShopDashboardSidebar from "../dashboard/seller/ShopDashboardSidebar";

function ShopDashboard() {
  return (
    <div>
      <ShopDashboardHeader />
      <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopDashboardSidebar active={1} />
            </div>
            <ShopDashboardHero />
          </div>
    </div>
  );
}
export default ShopDashboard;

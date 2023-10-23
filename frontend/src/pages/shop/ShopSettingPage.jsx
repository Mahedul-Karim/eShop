import React from "react";
import ShopSettings from "../../components/shop/ShopSettings";
import ShopDashboardHeader from "../../components/dashboard/seller/ShopDashboardHeader";
import ShopDashboardSidebar from "../../components/dashboard/seller/ShopDashboardSidebar";

const ShopSettingPage = () => {
  return (
    <div>
      <ShopDashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopDashboardSidebar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingPage;
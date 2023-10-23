import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import AllRefundOrders from '../../components/shop/AllRefundOrders';

const ShopRefunds = () => {
  return (
    <div>
    <ShopDashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopDashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
</div>
  )
}

export default ShopRefunds
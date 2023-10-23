import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import ShopAllOrders from '../../components/dashboard/seller/ShopAllOrders';

const ShopOrders = () => {
  return (
        <div>
            <ShopDashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <ShopDashboardSidebar active={2} />
                </div>
                <div className="w-full justify-center flex">
                   <ShopAllOrders />
                </div>
              </div>
        </div>
  )
}

export default ShopOrders
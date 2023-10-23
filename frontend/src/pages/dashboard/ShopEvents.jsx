import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import ShopAllEvents from '../../components/dashboard/seller/ShopAllEvents';

const ShopEvents = () => {
  return (
    <div>
        <ShopDashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopDashboardSidebar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <ShopAllEvents />
            </div>
          </div>
    </div>
  )
}

export default ShopEvents
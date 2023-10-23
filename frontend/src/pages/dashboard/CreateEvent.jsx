import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopCreateEvents from '../../components/dashboard/seller/ShopCreateEvents';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';

const CreateEvent = () => {
  return (
    <div>
        <ShopDashboardHeader />
        <div className="flex items-center justify-between w-full">
      <div className="w-[330px]">
        <ShopDashboardSidebar active={6} />
      </div>
      <div className="w-full justify-center flex">
        <ShopCreateEvents />
      </div>
    </div>
    </div>
  )
}

export default CreateEvent
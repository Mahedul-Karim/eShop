import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import ShopAllProducts from '../../components/dashboard/seller/ShopAllProducts';

const ShopProducts = () => {
  return (
    <div>
        <ShopDashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopDashboardSidebar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <ShopAllProducts />
            </div>
          </div>
    </div>
  )
}

export default ShopProducts
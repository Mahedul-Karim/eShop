import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader'
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import ShopAllCoupons from '../../components/dashboard/seller/ShopCreateCoupons';

const CreateCoupons = () => {
  return (
    <div>
        <ShopDashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopDashboardSidebar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <ShopAllCoupons />
            </div>
          </div>
    </div>
  )
}

export default CreateCoupons
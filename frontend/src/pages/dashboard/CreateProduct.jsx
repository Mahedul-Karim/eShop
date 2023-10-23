import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';
import ShopCreateProduct from '../../components/dashboard/seller/ShopCreateProduct';

const CreateProduct = () => {
  return (
    <div>
        <ShopDashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopDashboardSidebar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <ShopCreateProduct />
            </div>
          </div>
    </div>
  )
}

export default CreateProduct
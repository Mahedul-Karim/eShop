import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import WithdrawMoney from '../../components/dashboard/seller/WithdrawMoney';
import ShopDashboardSidebar from '../../components/dashboard/seller/ShopDashboardSidebar';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <ShopDashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <ShopDashboardSidebar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage
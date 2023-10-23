import React from 'react'
import ShopDashboardHeader from '../../components/dashboard/seller/ShopDashboardHeader';
import Footer from '../../components/layout/Footer';
import OrderDetails from '../../components/dashboard/seller/OrderDetails';

const ShopOrderDetails = () => {
  return (
    <div>
         <ShopDashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default ShopOrderDetails
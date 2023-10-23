import React from 'react'
import AdminHeader from '../../../components/dashboard/admin/AdminHeader';
import AdminSideBar from '../../../components/dashboard/admin/AdminSidebar';
import AllProducts from '../../../components/dashboard/admin/AllProducts';

const AdminDashboardProducts = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <AllProducts />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardProducts
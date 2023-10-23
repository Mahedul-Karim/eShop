import React from 'react'
import AdminHeader from '../../../components/dashboard/admin/AdminHeader';
import AdminSideBar from '../../../components/dashboard/admin/AdminSidebar';
import AllWithdraw from '../../../components/dashboard/admin/AllWithdraw';

const AdminDashboardWithdraw = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
         <AllWithdraw />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardWithdraw
import React from 'react'
import AdminHeader from '../../../components/dashboard/admin/AdminHeader';
import AdminSideBar from '../../../components/dashboard/admin/AdminSidebar';
import AllUsers from '../../../components/dashboard/admin/AllUsers';

const AdminDashboardUsers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <AllUsers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardUsers
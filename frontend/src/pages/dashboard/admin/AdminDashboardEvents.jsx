import React from 'react'
import AdminHeader from '../../../components/dashboard/admin/AdminHeader'
import AdminSideBar from '../../../components/dashboard/admin/AdminSidebar'
import AllEvents from '../../../components/dashboard/admin/AllEvents'

const AdminDashboardEvents = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <AllEvents />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardEvents
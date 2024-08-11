import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../../components/dashboard/admin/common/Orders";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders } = useSelector((state) => state.order);

  return (
    <div>
      <Orders adminOrders={adminOrders} />
    </div>
  );
};

export default AdminDashboardOrders;

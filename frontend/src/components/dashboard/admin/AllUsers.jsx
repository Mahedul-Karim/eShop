import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../../util/style";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useHttp } from "../../hooks/useHttp";
import { userActions } from "../../../store/userSlice";
import Loader from "../../../util/Loader";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [isLoading, fetchData] = useHttp();

  useEffect(() => {
    const getAllUsers = async function () {
      const data = await fetchData("user/admin/shop", "GET", {
        authorization: `Bearer ${token}`,
      });

      dispatch(userActions.getAllUsers(data.users));
    };

    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await fetchData(`user/${id}`, "DELETE", {
        authorization: `Bearer ${token}`,
      });

      dispatch(userActions.deleteUser(id));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  allUsers &&
    allUsers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center pt-5">
          <div className="w-[97%]">
            <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                  <div className="w-full flex justify-end cursor-pointer">
                    <RxCross1 size={25} onClick={() => setOpen(false)} />
                  </div>
                  <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                    Are you sure you wanna delete this user?
                  </h3>
                  <div className="w-full flex items-center justify-center">
                    <div
                      className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                      onClick={() => setOpen(false)}
                    >
                      cancel
                    </div>
                    <div
                      className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                      onClick={() => setOpen(false) || handleDelete(userId)}
                    >
                      confirm
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";

import { useHttp } from "../../hooks/useHttp";
import { userActions } from "../../../store/userSlice";
import Loading from "../common/Loading";

import { useToast } from "../../hooks/useToast";
import { formatDate } from "../../../util/helpers";
import Table from "../../layout/data-table/Table";
import ConfirmationModal from "../../ui/modal/ConfirmationModal";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { success, error } = useToast();

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

  const handleDelete = async () => {
    try {
      const data = await fetchData(`user/${userId}`, "DELETE", {
        authorization: `Bearer ${token}`,
      });

      dispatch(userActions.deleteUser(userId));
      success(data.message);
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pt-5">
          <div>
            <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
            {allUsers?.length > 0 ? (
              <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
                <Table
                  extraStyles="hidden sm:grid border-b border-solid font-semibold bg-gray-100"
                  columns={"grid-cols-[0.3fr_0.5fr_0.4fr_0.2fr_0.1fr]"}
                >
                  <div>Name</div>
                  <div>Email</div>
                  <div>Joined At</div>
                  <div>Role</div>
                  <div />
                </Table>
                {allUsers.map((user, id) => {
                  return (
                    <Table
                      extraStyles="border-b border-solid items-center"
                      key={user._id}
                      columns={"sm:grid-cols-[0.3fr_0.5fr_0.4fr_0.2fr_0.1fr]"}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm inline-block sm:hidden">
                          Name:
                        </p>
                        <p>{user?.name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm inline-block sm:hidden">
                          Email:
                        </p>
                        {user?.email}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm inline-block sm:hidden">
                          Joined At:
                        </p>
                        {formatDate(user?.createdAt)}
                      </div>
                      <div>
                        <p className="font-medium text-sm inline-block sm:hidden">
                          Role:
                        </p>
                        {user?.role}
                      </div>
                      <button
                        onClick={() => setUserId(user._id) || setOpen(true)}
                        className="flex items-center justify-end sm:justify-normal"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </Table>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center text-lg h-full">
                <p>No users were found!</p>
              </div>
            )}

            <ConfirmationModal
              open={open}
              setOpen={setOpen}
              confirmationFunction={handleDelete}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;

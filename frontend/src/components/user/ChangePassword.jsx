import { useState } from "react";

import { useHttp } from "../hooks/useHttp";
import { useToast } from "../hooks/useToast";
import { useSelector } from "react-redux";
import Loader from "../../util/Loader";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { success,error } = useToast();

  const { token } = useSelector((state) => state.auth);

  const [isLoading, fetchData] = useHttp();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchData(
        "user/updatePassword",
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({ oldPassword, newPassword, confirmPassword })
      );
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      success(data.message);
    } catch (err) {
      error(err.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-5">
          <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
            Change Password
          </h1>
          <div className="w-full">
            <form
              onSubmit={passwordChangeHandler}
              className="flex flex-col items-center"
            >
              <div className=" w-[100%] 800px:w-[50%] mt-5">
                <label className="block pb-2">Enter your old password</label>
                <input
                  type="password"
                  className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%] mt-2">
                <label className="block pb-2">Enter your new password</label>
                <input
                  type="password"
                  className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%] mt-2">
                <label className="block pb-2">
                  Enter your confirm password
                </label>
                <input
                  type="password"
                  className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ChangePassword;

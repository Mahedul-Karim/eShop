import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { userActions } from "../../store/userSlice";
import { useToast } from "../hooks/useToast";

function ProfileContent({ active }) {
  const { user, token } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState();
  const [isLoading, fetchData] = useHttp();

  const { success, error } = useToast();

  const dispatch = useDispatch();

  const handleImage = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatarPreview(fileReader.result);
      }
    };

    fileReader.readAsDataURL(e);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchData(
        `user`,
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          name,
          phoneNumber,
          avatar: avatarPreview,
          password,
        })
      );

      dispatch(
        userActions.userRequestSuccess({ user: data.user, token: data.token })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );

      success("User updated");
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={`${!avatarPreview ? user?.avatar?.url : avatarPreview}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-secondary"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="ml-2 md:ml-8">
        <form onSubmit={handleFormSubmit}>
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0 disabled:bg-background`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`border p-2 rounded-[5px] !w-[95%] mb-1 800px:mb-0 disabled:bg-background`}
                required
                value={user?.email}
                disabled
              />
            </div>
          </div>

          <div className="800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0 disabled:bg-background`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Enter your password</label>
              <input
                type="password"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0 disabled:bg-background`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            className={`w-[120px] md:w-[200px] md:text-base text-sm h-[40px] border border-primary text-center text-primary rounded-[3px] disabled:border-primary/[0.4] disabled:text-primary/[0.4]`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileContent;

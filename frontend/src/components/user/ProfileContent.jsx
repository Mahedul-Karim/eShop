import { useDispatch, useSelector } from "react-redux";
import styles from "../../util/style";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";
import AllOrders from "../orders/AllOrders";
import AllRefundOrders from "../orders/AllRefundOrders";
import TrackOrder from "../orders/TrackOrder";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import { useHttp } from "../hooks/useHttp";
import { userActions } from "../../store/userSlice";
import { useToast } from "../hooks/useToast";

function ProfileContent({ active }) {
  const { user, token } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState();
  const [_, fetchData] = useHttp();

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
          email,
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
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <label htmlFor="image">
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
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Enter your password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <input
            className={`w-[120px] md:w-[200px] md:text-base text-sm h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px]  cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}

export default ProfileContent;

import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { useHttp } from "../hooks/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../ui/modal/Modal";
import AddAddress from "./address/AddAddress";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { success, error, warning } = useToast();

  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [_, fetchData] = useHttp();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (country === "" || city === "" || addressType === "") {
      return warning("Fields can not be empty");
    }

    try {
      const data = await fetchData(
        "user/address",
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          country,
          city,
          zipCode,
          address1,
          address2,
          addressType,
        })
      );

      dispatch(
        userActions.userRequestSuccess({ user: data.user, token: data.token })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );
      setOpen(false);
      success("Address added");
    } catch (err) {
      error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await fetchData(`user/address/${id}`, "DELETE", {
        authorization: `Bearer ${token}`,
      });

      dispatch(
        userActions.userRequestSuccess({ user: data.user, token: data.token })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );

      success("Address removed");
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className="w-full px-5">
      <Modal open={open} onClick={() => setOpen(false)}>
        <AddAddress
          handleSubmit={handleSubmit}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}
          addressType={addressType}
          setAddressType={setAddressType}
          addressTypeData={addressTypeData}
        />
      </Modal>
      <div className="flex w-full 400px:flex-row flex-col-reverse 400px:items-center justify-between">
        <h1 className="text-lg md:text-[25px] font-[600] text-[#000000ba]">
          My Addresses
        </h1>
        <div
          className={`w-[100px] md:w-[150px] bg-black py-2 my-3 flex items-center justify-center cursor-pointer rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min py-2 rounded-[4px] flex items-center px-3 shadow justify-between mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="font-[600] 400px:text-base text-sm">{item.addressType}</h5>
            </div>
            <div className="flex items-center">
              <h6 className="text-[10px] 400px:text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="flex items-center">
              <h6 className="text-[10px] 400px:text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="flex items-center justify-between">
              <AiOutlineDelete
                className="cursor-pointer 400px:text-[25px] text-lg"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default Address;

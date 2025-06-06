import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { useToast } from "../hooks/useToast";

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  isLoading,
  endpoint,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const { error } = useToast();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  const [_, fetchData] = useHttp();

  useEffect(() => {
    const getUser = async function () {
      const userId =
        data.userId._id === me ? data.participentId._id : data.userId._id;
      try {
        const data = await fetchData(`${endpoint}/${userId}`);

        if (endpoint === "shop") {
          setUserData(data.shop);
        } else {
          setUserData(data.user);
        }
      } catch (err) {
        error(err.message);
      }
    };
    getUser();
  }, []);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src={`${userData?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId === userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default MessageList;

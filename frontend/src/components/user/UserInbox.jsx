import React, { useRef, useState, useEffect } from "react";
import { useHttp } from "../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../hooks/useToast";
import socketIO from "socket.io-client";
import { SOCKET_URL } from "../../util/base";
import Header from "../layout/Header";
import MessageList from "../inbox/MessageList";
import Inbox from "../inbox/Inbox";

const socketId = socketIO(SOCKET_URL, { transports: ["websocket"] });

const UserInbox = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);

  const { error } = useToast();

  const scrollRef = useRef(null);

  const [isLoading, fetchData] = useHttp();

  socketId.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async function () {
      try {
        const data = await fetchData(
          `conversation/message/${currentChat?._id}`
        );

        setMessages(data.messages);
      } catch (err) {
        error(err.message);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getConversation = async function () {
      try {
        const data = await fetchData(`conversation/${user._id}`, "GET", {
          authorization: `Bearer ${token}`,
        });
        setConversations(data.conversation);
      } catch (err) {
        error(err.message);
      }
    };
    getConversation();
  }, [user, messages]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const data = await fetchData(
          "conversation/message",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify(message)
        );
        console.log(data);
        setMessages((prev) => [...prev, data.messages]);
        updateLastMessage();
      }
    } catch (error) {
      error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      socketId.emit("addUser", user._id);
      socketId.on("getUser", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  async function updateLastMessage() {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    try {
      const data = await fetchData(
        `conversation/${currentChat._id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({ lastMessage: newMessage, lastMessageId: user._id })
      );
      setNewMessage("");
    } catch (err) {
      error(err.message);
    }
  }

  const handleImageUpload = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    const formData = new FormData();

    formData.append("sender", user._id);
    formData.append("conversationId", currentChat._id);
    formData.append("text", newMessage);
    formData.append("images", e);

    try {
      const data = await fetchData(
        "conversation/message",
        "POST",
        {},
        formData
      );

      setMessages((prev) => [...prev, data.messages]);
      updateLastMessageForImage();
    } catch (error) {
      error(error.message);
    }
  };

  async function updateLastMessageForImage() {
    socketId.emit("updateLastMessage", {
      lastMessage: "Photo",
      lastMessageId: user._id,
    });

    try {
      const data = await fetchData(
        `conversation/${currentChat._id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({ lastMessage: "Photo", lastMessageId: user._id })
      );
      setNewMessage("");
    } catch (err) {
      error(err.message);
    }
  }

  return (
    <div className="w-full">
      {!open && (
        <>
          <Header />
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                endpoint={"shop"}
              />
            ))}
        </>
      )}

      {open && (
        <Inbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default UserInbox;

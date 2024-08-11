import React, { useRef, useState, useEffect, useReducer } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useSelector } from "react-redux";

import socketIO from "socket.io-client";
import { SOCKET_URL } from "../../../util/base";
import MessageList from "../../inbox/MessageList";
import Inbox from "../../inbox/Inbox";
import { useToast } from "../../hooks/useToast";

const socketId = socketIO(SOCKET_URL, { transports: ["websocket"] });


const DashboardMessages = () => {
  const { seller, sellerToken } = useSelector((state) => state.seller);

  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();

  const scrollRef = useRef(null);

  const [isLoading, fetchData] = useHttp();

  const { error } = useToast();

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
        const data = await fetchData(`conversation/${seller._id}`, "GET", {
          authorization: `Bearer ${sellerToken}`,
        });
        setConversations(data.conversation);
      } catch (err) {
        error(err.message);
      }
    };
    getConversation();
  }, [seller]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
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

        setMessages((prev) => [...prev, data.messages]);
        updateLastMessage();
      }
    } catch (error) {
      error(error.message);
    }
  };

  useEffect(() => {
    if (seller) {
      socketId.emit("addUser", seller._id);
      socketId.on("getUser", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  async function updateLastMessage() {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    try {
      const data = await fetchData(
        `conversation/${currentChat._id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({ lastMessage: newMessage, lastMessageId: seller._id })
      );
      setNewMessage("");
    } catch (err) {
      error(err.message);
    }
  }

  const handleImageUpload = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    const formData = new FormData();

    formData.append("sender", seller._id);
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
      lastMessageId: seller._id,
    });

    try {
      const data = await fetchData(
        `conversation/${currentChat._id}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({ lastMessage: "Photo", lastMessageId: seller._id })
      );
      setNewMessage("");
    } catch (err) {
      error(err.message);
    }
  }

  return (
    <div className="m-5 h-[85vh] overflow-y-auto hide-scrollbar rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={item._id}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
                endpoint={"user"}
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
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default DashboardMessages;

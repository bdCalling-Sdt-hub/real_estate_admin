import React, { useEffect, useState, useRef } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export const MassageBox = ({ files }) => {
  return (
    <div className="">
      <h2 className="text-lg mb-4">Message</h2>

      {/* Chat Container */}
      <Messages />
      <div style={{ display: files?.length > 0 ? "block" : "none" }}>
        <h1 className="mt-8 ">Upload File</h1>
        <div className="grid grid-cols-4 gap-4 mt-5">
          {files?.length > 0 &&
            files.map((file, index) => (
              <img
                key={index}
                className="w-full rounded-md"
                src={`${file}`}
                alt=""
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.logInUser.token);
  const { authId } = parseJwt(token);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const newSocket = io(`http://10.0.60.118:5000?id=${authId}`);
    setSocket(newSocket);

    newSocket.emit("order-messages", {
      orderId: id,
    });

    newSocket.on("order-messages", (message) => {
      setMessages(
        message.messages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
    });

    newSocket.on(`new-message-order/${id}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [authId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("new-message-order", {
      orderId: id,
      text: newMessage,
    });

    setNewMessage("");
  };
  return (
    <div className="border rounded-md p-4">
      <div ref={messageContainerRef} className="h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              (msg?.senderId?._id || msg?.senderId) === authId
                ? "justify-end"
                : "start"
            } mb-4 p-4`}
          >
            {(msg?.senderId?._id || msg?.senderId) !== authId && (
              <img
                src={
                  msg.senderId.profile_image ||
                  `https://ui-avatars.com/api/?name=${msg.senderId.name}`
                }
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <div
                className={`${
                  (msg?.senderId?._id || msg?.senderId) === authId
                    ? "bg-[#2A216D] text-white text-right"
                    : "bg-gray-200 text-gray-700"
                } p-3 rounded-md max-w-md w-fit`}
              >
                {msg.message}
              </div>
              <span className="text-gray-400 text-sm mt-1 inline-block">
                {dayjs(msg.createdAt).format("DD/MM/YYYY hh:mm A")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 border-t pt-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="rounded-md py-3 border-[#2A216D]"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="ml-2 bg-[#2A216D]"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

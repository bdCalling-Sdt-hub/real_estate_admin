import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import dayjs from "dayjs";
import parseJWT from "../../utils/parseJWT";

export const MassageBox = ({ files }) => {
  return (
    <div className="">
      <h2 className="text-lg mb-4">Message</h2>
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
  const { authId } = parseJWT(token);
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
        {messages.map((msg, index) =>
          msg.isRevision ? (
            <RevisionMessage key={index} msg={msg} authId={authId} />
          ) : (
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
          )
        )}
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

const RevisionMessage = ({ msg, authId }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div
      className={`flex flex-col m-4 ${
        (msg?.senderId?._id || msg?.senderId) === authId
          ? "justify-end ml-auto"
          : "start"
      } mb-4 px-2 py-1 border border-[#9D99BC] bg-[#F9F9FF] rounded-md w-fit`}
    >
      <div className="flex items-start justify-between gap-12">
        <div>
          <p className="text-[#2A216D] font-medium">Revision Request</p>
          <span className="text-gray-400 text-xs inline-block">
            {dayjs(msg.createdAt).format("DD/MM/YYYY hh:mm A")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={
              msg?.senderId?.profile_image
                ? `${import.meta.env.VITE_BASE_URL}/${
                    msg?.senderId?.profile_image
                  }`
                : `https://ui-avatars.com/api/?name=${msg?.senderId?.name}`
            }
            alt={msg?.senderId?.name}
            className="w-6 h-6 rounded-full"
          />
          <p className="text-gray-900 font-medium">{msg?.senderId?.name}</p>
        </div>
      </div>
      <div className="max-w-[200px] my-2">
        {msg?.message_img?.includes("video") ? (
          <video
            src={msg?.message_img}
            controls
            className="rounded-md mb-2 border border-[#9d99bc]"
          />
        ) : (
          <img
            src={msg?.message_img}
            alt={msg?.senderId?.name}
            className="rounded-md mb-2 border border-[#9d99bc]"
          />
        )}
        <p
          className={`text-gray-600 text-sm pl-1 max-h-[100px] overflow-hidden ${
            showMore ? "max-h-full" : "max-h-[60px]"
          }`}
        >
          <strong>Message: </strong>
          {msg?.message}
        </p>
        {msg?.message?.length > 100 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 text-sm ml-1"
          >
            {showMore ? "See Less" : "See More"}
          </button>
        )}
      </div>
      {msg?.taskId && (
        <Link
          to={`/dashboard/task-management/all-Services/project-file/${msg?.taskId}`}
          className="bg-transparent hover:bg-[#2A216D] text-[#2A216D] font-semibold hover:text-white border border-[#9D99BC] hover:border-transparent rounded text-center my-2"
        >
          View Task
        </Link>
      )}
    </div>
  );
};

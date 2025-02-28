import { Table, Avatar } from "antd";
import { DeleteOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import parseJWT from "../../utils/parseJWT";
import dayjs from "dayjs";

const List = ({ tab, handleRowClick, setDeleteModal }) => {
  const token = useSelector((state) => state.logInUser.token);
  const { authId } = parseJWT(token);
  const [messages, setMessages] = useState(null);

  const columns = [
    {
      title: "",
      dataIndex: "starred",
      key: "starred",
      render: (_, contact) => {
        const isFavorite = contact.favorite.length > 0; // Adjust based on your logic
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFav(contact);
            }}
          >
            {isFavorite ? (
              <StarFilled style={{ color: "#FFD700" }} />
            ) : (
              <StarOutlined style={{ color: "#d9d9d9" }} />
            )}
          </button>
        );
      },
      width: "5%",
    },
    {
      title: "Email",
      dataIndex: "sender",
      key: "sender",
      render: (_, record) => {
        if (!record.messages.length) return "Unknown";
        const sender = record.participants.find((p) => p._id !== authId) || {};
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={
                sender.profile_image
                  ? `${import.meta.env.VITE_API_URL}${sender.profile_image}`
                  : `https://ui-avatars.com/api/?name=${sender.name}`
              }
              alt={sender.name}
              style={{ marginRight: "10px" }}
            />
            {sender.name || "Unknown"}
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (_, record) => {
        if (!record.messages.length) return "No Subject";
        const message = record.messages[0];
        return (
          <div>
            <strong>{message.subject}</strong> -{" "}
            {message.message.replace(/<\/?[^>]+(>|$)/g, "")}
          </div>
        );
      },
      width: "50%",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "right",
      render: (_, record) =>
        dayjs(record.createdAt).format("MMM D, YYYY h:mm A"),
      width: "15%",
    },
  ];

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}?id=${authId}`);

    socket.emit("conversion-list");

    socket.on("conversion-list", (message) => {
      setMessages(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleFav = (id) => {
    console.log(id);
  };
  return (
    <>
      <h1 className="text-lg font-semibold mb-4">{tab}</h1>
      <div style={{ overflowX: "auto", maxHeight: "75vh", overflowY: "auto" }}>
        <Table
          dataSource={messages}
          columns={columns}
          pagination={false}
          bordered
          onRow={(record) => ({
            onClick: () => handleRowClick({ record, authId }),
          })}
          rowClassName="cursor-pointer"
        />
      </div>
    </>
  );
};

export default List;

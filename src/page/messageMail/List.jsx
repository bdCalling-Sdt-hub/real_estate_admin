import { Table, Avatar, message } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import parseJWT from "../../utils/parseJWT";
import dayjs from "dayjs";
import { useToggleFavoriteMutation } from "../redux/api/messageApi";

const List = ({ tab, handleRowClick, favContacts, refetchFavs }) => {
  const token = useSelector((state) => state.logInUser.token);
  const { authId, role } = parseJWT(token);

  const [messages, setMessages] = useState(null);
  const [favMessages, setFavMessages] = useState(favContacts?.data);

  const columns = [
    {
      title: "",
      dataIndex: "starred",
      key: "starred",
      render: (_, contact) => {
        const isFavorite =
          tab === "Favorite" ? true : contact.favorite.includes(authId);
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFav({ id: contact._id, isFavorite });
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
        const message = record.messages[record.messages.length - 1];
        return (
          <div className="truncate">
            <strong>{message.subject}</strong> -{" "}
            {message?.message?.replace(/<\/?[^>]+(>|$)/g, "")}
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
      render: (_, record) => (
        <p className="text-nowrap">
          {dayjs(record.createdAt).format("MMM D, YYYY h:mm A")}
        </p>
      ),
      width: "15%",
    },
  ];

  useEffect(() => {
    if (favContacts) {
      setFavMessages(favContacts?.data);
    }
  }, [favContacts]);

  useEffect(() => {
    const socket = io(
      `${import.meta.env.VITE_API_URL}?id=${authId}&role=${role}`
    );

    socket.emit("conversion-list");

    socket.on("conversion-list", (message) => {
      setMessages(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [toggleFavorite] = useToggleFavoriteMutation();
  const handleToggleFav = async ({ id, isFavorite }) => {
    try {
      await toggleFavorite({
        conversationId: id,
        types: isFavorite ? "remove" : "add",
      });
      const msgs = [
        ...messages?.filter((x) => x._id != id),
        {
          ...messages.find((x) => x._id === id),
          favorite: isFavorite ? [] : [authId],
        },
      ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      setMessages(msgs);
      setFavMessages((prev) => prev?.filter((msg) => msg._id != id));
      refetchFavs();
      message.success(`${isFavorite ? "Removed from" : "Added to"} favorites`);
    } catch (error) {
      console.log(error);
      message.success("Failed adding to favorites");
    }
  };
  return (
    <>
      <h1 className="text-lg font-semibold mb-4">{tab}</h1>
      <div style={{ overflowX: "auto", maxHeight: "75vh", overflowY: "auto" }}>
        <Table
          dataSource={tab === "All" ? messages : favMessages || []}
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

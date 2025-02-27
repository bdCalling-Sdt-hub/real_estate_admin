import React from "react";
import { List, Typography, Button, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";

import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDeleteNotificationMutation, useGetAllNotificationQuery } from "../redux/api/clientManageApi";

const Notification = () => {
  
  const { data: notificationData } = useGetAllNotificationQuery();
  console.log(notificationData)
  const navigate = useNavigate()
  const[deleteNotification] = useDeleteNotificationMutation()
  const notifications = notificationData?.data?.notifications?.map((item) => ({
    id:item._id,
    title: item.title,
    description: item.message,
    time: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    status: item.status, 
  })) || [];

  const handleDelete = (item) => {
 console.log(item.id)
    Modal.confirm({
      title: "Are you sure you want to delete this client?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteNotification(item.id).unwrap();
          message.success(response.message);
        } catch (error) {
          message.error(error.data?.message);
        }
      },
    });
  };

  return (
    <div className="bg-white h-screen p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Notification</span>
        </h1>
      </div>

      <div className="mt-4 p-4">
        <Typography.Title level={4} className="mb-4">
          Showing {notifications.length} Notifications
        </Typography.Title>

        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  onClick={() => handleDelete(item)}
                  danger
                  icon={<DeleteOutlined />}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <span
                    className={`font-semibold text-lg ${
                      item.status === false ? "font-bold text-black" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </span>
                }
                description={
                  <div className="flex justify-between items-center">
                    <span
                      className={`${
                        item.status === false ? "font-bold text-black" : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </span>
                    <span className="text-gray-500 text-sm">{item.time}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Notification;

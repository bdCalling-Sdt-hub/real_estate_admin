import React from "react";
import { List, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";

const notifications = [
  {
    title: "Appointment Reminder",
    description: "Your photoshoot for project #1234 is scheduled for tomorrow at 10:00 AM at Lake Park.",
    time: "Just Now",
  },
  {
    title: "Order Status Update",
    description: "Your project #1234 has moved to 'In Progress.' Our team is working on it.",
    time: "5 min ago",
  },
  {
    title: "Payment Received",
    description: "We've successfully processed your payment of $500 for project #1234.",
    time: "30 min ago",
  },
  {
    title: "Service Completion Notice",
    description: "Good news! The photography for your project #1234 has been completed.",
    time: "6 hours ago",
  },
  {
    title: "Delivery Update",
    description: "Your project #1234 is ready! Access your photos and videos through your client portal.",
    time: "8 hours ago",
  },
];

const Notification = () => {
  return (
  <div className="bg-white h-screen p-4">
    <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">Change Password</span>
          </h1>
      <div className="mt-4 p-4">
      <Typography.Title level={4} className="mb-4">
        Showing {notifications.length} Notifications
      </Typography.Title>

      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type="text" danger icon={<DeleteOutlined />} />]}
          >
            <List.Item.Meta
              title={
                <span className="font-semibold text-lg">
                  {item.title}
                </span>
              }
              description={
                <div className="flex justify-between items-center">
                  <span>{item.description}</span>
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

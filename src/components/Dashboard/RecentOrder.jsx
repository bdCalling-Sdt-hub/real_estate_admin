import React, { useState } from "react";
import { Table, Avatar, Tag, Button, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetRecentOrderQuery } from "../../page/redux/api/dashboardApi";
import { imageUrl } from "../../page/redux/api/baseApi";

export const RecentOrder = () => {
  const [page, setCurrentPage] = useState(1);
  
  const pageSize = 10;
  const { data: recentOrder, isLoading } = useGetRecentOrderQuery({
    page,
    limit: pageSize,
  });
  console.log(recentOrder?.data?.meta);

  if (isLoading) return <div>Loading...</div>;

  const data = recentOrder?.data?.data?.map((order) => ({
    key: order._id,
    orderId: order.orderId,
    orderDate: new Date(order.createdAt).toLocaleDateString(),
    client: {
      avatar: `${imageUrl}/${order.client.profile_image}`,
      name: order.client.name,
    },
    address: `${order.address.streetName} ${order.address.streetAddress}, ${order.address.city}, ${order.address.zipCode}`,
    services: order.totalTasks,
    status: order.status,
    payment: "Unpaid",
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Client Name",
      dataIndex: "client",
      key: "client",
      render: (client) => (
        <div className="flex items-center">
          <Avatar src={client.avatar} alt={client.name} />
          <span style={{ marginLeft: 8 }}>{client.name}</span>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#9B3C7B",
            borderColor: "#9B3C7B",
          }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-medium pt-3 pl-6">Recent Orders</h2>
      <div className="h-[400px] overflow-y-auto">
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
          style={{ marginTop: "20px" }}
        />
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={recentOrder?.data?.meta?.totalOrders || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

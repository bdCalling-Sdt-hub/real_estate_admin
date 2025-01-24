import React from "react";
import { Table, Tag } from "antd";

export const IncomeOverview = () => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
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
      title: "Appointments",
      dataIndex: "appointments",
      key: "appointments",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="pink" key={status}>
          {status}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "#12333",
      address: "Royal Ln. Mesa, New Jersey",
      services: 2,
      appointments: "12/04/24 at 3:00 pm",
      status: "Submitted",
    },
    {
      key: "2",
      orderId: "#12333",
      address: "W. Gray Utica, Pennsylvania",
      services: 6,
      appointments: "08/04/24 at 5:00 pm",
      status: "Submitted",
    },
    {
      key: "3",
      orderId: "#12333",
      address: "Ash San Jose, South Dakota",
      services: 3,
      appointments: "02/04/24 at 4:00 pm",
      status: "Submitted",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 px-6 pt-3">Need to Deliver Today</h1>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default IncomeOverview;

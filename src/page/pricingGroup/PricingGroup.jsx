import { Input } from 'antd';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const PricingGroup = () => {
  const data = [
    {
      key: "1",
      slNo: "#1233",
      groupName: "VIP Group",
      numberOfClients: "04",
    },
    {
      key: "2",
      slNo: "#1233",
      groupName: "Premium Group",
      numberOfClients: "05",
    },
    {
      key: "3",
      slNo: "#1233",
      groupName: "VIP Group",
      numberOfClients: "02",
    },
    {
      key: "4",
      slNo: "#1233",
      groupName: "Premium Group",
      numberOfClients: "08",
    },
    {
      key: "5",
      slNo: "#1233",
      groupName: "VIP Group",
      numberOfClients: "12",
    },
    {
      key: "6",
      slNo: "#1233",
      groupName: "Premium Group",
      numberOfClients: "03",
    },
    {
      key: "7",
      slNo: "#1233",
      groupName: "VIP Group",
      numberOfClients: "06",
    },
  ];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      align: "left",
      width: "15%",
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      align: "center",
      width: "50%",
    },
    {
      title: "Number of Client",
      dataIndex: "numberOfClients",
      key: "numberOfClients",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
          <Link to={'/dashboard/pricing-group/edit-pricing-group'}><button
            shape="circle"
            className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
          >
            <EditOutlined />
          </button></Link>
          <button
            shape="circle"
            className="bg-[#D80027] h-10 w-10 rounded text-white text-xl"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
      align: "end",
      width: "20%",
    },
  ];

  const navigate = useNavigate();
  return (
    <div className='bg-white p-4 h-screen'>
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
          <span className="text-lg font-semibold">Pricing Groups</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <div>
          <Link to={'/dashboard/pricing-group/add-pricing-group'}><button className="bg-[#2A216D] text-[white] rounded px-11 py-2.5">
            + New Pricing Group
          </button></Link>
        </div>
      </div>

      <div className="">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 7,
            showSizeChanger: true,
            pageSizeOptions: ["7", "10", "20"],
          }}
          bordered
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};
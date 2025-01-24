import { Input } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AddTeamMember } from './AddTeamMember';
import { EditTeamMember } from './EditTeamMember';

export const TeamMember = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
    const [openAddModal1, setOpenAddModal1] = useState(false);
  const data = [
    {
      key: "1",
      slNo: "#1233",
      name: "Annette Black",
      email: "bockely@att.com",
      phone: "(201) 555-0124",
      role: "Photographer",
      avatar: "https://via.placeholder.com/20",
    },
    {
      key: "2",
      slNo: "#1233",
      name: "Jerome Bell",
      email: "csilvers@rizon.com",
      phone: "(219) 555-0114",
      role: "Photo Editor",
      avatar: "https://via.placeholder.com/20",
    },
    {
      key: "3",
      slNo: "#1233",
      name: "Ronald Richards",
      email: "qamaho@mail.com",
      phone: "(316) 555-0116",
      role: "Video Editor",
      avatar: "https://via.placeholder.com/20",
    },
    {
      key: "4",
      slNo: "#1233",
      name: "Dianne Russell",
      email: "xterris@gmail.com",
      phone: "(907) 555-0101",
      role: "Energy Label Advisor",
      avatar: "https://via.placeholder.com/20",
    },
    {
      key: "5",
      slNo: "#1233",
      name: "Albert Flores",
      email: "xterris@gmail.com",
      phone: "(505) 555-0125",
      role: "Manager",
      avatar: "https://via.placeholder.com/20",
    },
    {
      key: "6",
      slNo: "#1233",
      name: "Eleanor Pena",
      email: "xterris@gmail.com",
      phone: "(704) 555-0127",
      role: "Admin",
      avatar: "https://via.placeholder.com/20",
    },
  ];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "10%",
    },
    {
      title: "Team Member Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.avatar}
            alt={text}
            style={{ width: "20px", height: "20px", borderRadius: "50%", marginRight: "10px" }}
          />
          {text}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
     
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
          <button
          onClick={() => setOpenAddModal1(true)}
            shape="circle"
            className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
          >
            <EditOutlined />
          </button>
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
          <span className="text-lg font-semibold">Manage Team Members</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>
      <div className="">
        <div>
          <button onClick={() => setOpenAddModal(true)} className="bg-[#2A216D] mb-4 text-[white] rounded px-11 py-2.5">
            + New Company/client
          </button>
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
      <AddTeamMember openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}></AddTeamMember>
        <EditTeamMember openAddModal={openAddModal1}
        setOpenAddModal={setOpenAddModal1}></EditTeamMember>
    </div>
  );
};

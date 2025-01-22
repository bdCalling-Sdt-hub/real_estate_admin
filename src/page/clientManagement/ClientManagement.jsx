import React, { useState } from "react";
import { Table, Avatar, Button, Input } from "antd";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { ArrowRightOutlined } from "@ant-design/icons";
import { AddClientModal } from "./AddClientModal";
import { EditClientModal } from "./EditClientModal";
import { Link, useNavigate } from "react-router-dom";

export const ClientManagement = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);
  const navigate = useNavigate()
  const data = [
    {
      key: "1",
      slNo: "#1233",
      company: {
        logo: "https://i.pravatar.cc/40?img=1",
        name: "Louis Vuitton",
      },
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      phone: "(201) 555-0124",
    },
    {
      key: "2",
      slNo: "#1233",
      company: {
        logo: "https://i.pravatar.cc/40?img=2",
        name: "Bank of America",
      },
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      phone: "(219) 555-0114",
    },
    {
      key: "3",
      slNo: "#1233",
      company: { logo: "https://i.pravatar.cc/40?img=3", name: "Nintendo" },
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      phone: "(316) 555-0116",
    },
    {
      key: "4",
      slNo: "#1233",
      company: { logo: "https://i.pravatar.cc/40?img=4", name: "McDonald's" },
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      phone: "(907) 555-0101",
    },
    // Add more rows as necessary
  ];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "8%",
    },
    {
      title: "Company/Client Name",
      dataIndex: "company",
      key: "company",
      render: (company) => (
        <div className="flex items-center">
          <Avatar src={company.logo} alt={company.name} />
          <span style={{ marginLeft: 8 }}>{company.name}</span>
        </div>
      ),
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "30%",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Agent",
      key: "agent",
      render: () => (
        <Link to={'/dashboard/client-management/agent-client'}><Button
        icon={<ArrowRightOutlined />}
        style={{
          borderColor: "#2A216D",
          color: "#1E3F66",
        }}
      /></Link>
      ),
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
          <Button
          onClick={() => setOpenAddModal1(true)}
            icon={<FaEdit />}
            style={{
              backgroundColor: "#2A216D",
              color: "#fff",
              border: "none",
            }}
          />
          <Button
            icon={<FaTrash />}
            style={{
              backgroundColor: "#D80027",
              color: "#fff",
              border: "none",
            }}
          />
        </div>
      ),
      align: "end",
      width: "10%",
    },
  ];

  return (
    <div className="bg-white p-4 h-screen">
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
          <span className="text-lg font-semibold">Client Management</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <div>
          <button onClick={() => setOpenAddModal(true)} className="bg-[#2A216D] mb-8 text-[white] rounded px-11 py-2.5">
            + New Company/client
          </button>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
        bordered
      />

      <AddClientModal openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}></AddClientModal>
        <EditClientModal openAddModal={openAddModal1}
        setOpenAddModal={setOpenAddModal1}></EditClientModal>
    </div>
  );
};

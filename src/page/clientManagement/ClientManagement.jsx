import React, { useState } from "react";
import { Table, Avatar, Button, Input, Pagination, Modal, message } from "antd";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { AddClientModal } from "./AddClientModal";
import { EditClientModal } from "./EditClientModal";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteAccountMutation, useGetAllClientManagementQuery } from "../redux/api/clientManageApi";
import { imageUrl } from "../redux/api/baseApi";

export const ClientManagement = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: clientManagementData } = useGetAllClientManagementQuery({searchTerm, page: currentPage,
    limit: pageSize,});
  console.log(clientManagementData);
  const[deleteClient] = useDeleteAccountMutation()
  const navigate = useNavigate();

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setOpenAddModal1(true);
  };

  const data =
    clientManagementData?.data?.result?.map((client, index) => ({
      key: client._id,
      authId: client.authId,
      slNo: `#${index + 1}`,
      email: client.email,
      email_notifications: client.email_notifications,
      email_invoice: client.email_invoice,
      name: client.name,
      phone: client.phone_number,
      address: client.address,
      profile_image: client.profile_image,
    })) || [];

    
  // const data = [
  //   {
  //     key: "1",
  //     slNo: "#1233",
  //     company: {
  //       logo: "https://i.pravatar.cc/40?img=1",
  //       name: "Louis Vuitton",
  //     },
  //     address: "2464 Royal Ln. Mesa, New Jersey 45463",
  //     phone: "(201) 555-0124",
  //   },
  //   {
  //     key: "2",
  //     slNo: "#1233",
  //     company: {
  //       logo: "https://i.pravatar.cc/40?img=2",
  //       name: "Bank of America",
  //     },
  //     address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  //     phone: "(219) 555-0114",
  //   },
  //   {
  //     key: "3",
  //     slNo: "#1233",
  //     company: { logo: "https://i.pravatar.cc/40?img=3", name: "Nintendo" },
  //     address: "4517 Washington Ave. Manchester, Kentucky 39495",
  //     phone: "(316) 555-0116",
  //   },
  //   {
  //     key: "4",
  //     slNo: "#1233",
  //     company: { logo: "https://i.pravatar.cc/40?img=4", name: "McDonald's" },
  //     address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  //     phone: "(907) 555-0101",
  //   },
  //   // Add more rows as necessary
  // ];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "8%",
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar
            src={`${imageUrl}/${record.profile_image}`}
            alt={record.name}
          />
          <span style={{ marginLeft: 8 }}>{record.name}</span>
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
      width: "20%",
    },
    {
      title: "Agent",
      key: "agent",
      render: (record) => (
        <Link to={`/dashboard/client-management/agent-client/${record.key}`}>
          <Button
            icon={<ArrowRightOutlined />}
            style={{
              borderColor: "#2A216D",
              color: "#1E3F66",
            }}
          />
        </Link>
      ),
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <button
            onClick={() => handleEdit(record)}
            shape="circle"
            className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
          >
            <EditOutlined />
          </button>
          <button
          onClick={() => handleDelete(record)}
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

  const handlePageChange = (page) => {
    console.log("Page Changed to:", page); 
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    console.log(id)
    Modal.confirm({
      title: "Are you sure you want to delete this client?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteClient(id.authId).unwrap();
          message.success(response.message);
        } catch (error) {
          message.error(error.data?.message);
        }
      },
    });
  };

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
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#2A216D] mb-8 text-[white] rounded px-11 py-2.5"
          >
            + New Company/client
          </button>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}  
      />
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={clientManagementData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
          ;
        </div>

      <AddClientModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      ></AddClientModal>
      <EditClientModal
        openAddModal={openAddModal1}
        setOpenAddModal={setOpenAddModal1}
        selectClientManagement={selectedCategory}
      ></EditClientModal>
    </div>
  );
};

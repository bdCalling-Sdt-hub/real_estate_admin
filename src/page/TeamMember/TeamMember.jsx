import React, { useState } from "react";
import { Table, Avatar, Button, Input, Pagination, Modal, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AddTeamMember } from "./AddTeamMember";
import { EditTeamMember } from "./EditTeamMember";
import { useDeleteAccountMutation, useGetAllTeamMemberQuery } from "../redux/api/clientManageApi";
import { imageUrl } from "../redux/api/baseApi";

export const TeamMember = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);
  const[deleteTeamMember] = useDeleteAccountMutation()
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  // Fetch team members data from the API
  const { data: allTeamMember } = useGetAllTeamMemberQuery({searchTerm, page: currentPage,
    limit: pageSize,});


  const data = allTeamMember?.data?.result?.map((member, index) => ({
    key: member?._id,
    slNo: `#${index + 1}`,
    name: member?.name,
    email: member?.email,
    authId: member?.authId,
    phone: member?.phone_number,
    services: member?.serviceId?.map(service => service?.title).join(", "),
    servicesId:member?.serviceId,
    role: member?.role,
    roleOfName:member?.roleOfName,
    profile_image: member?.profile_image,
    view_assigned_order:member?.view_assigned_order,
    can_manage_teammembers:member?.can_manage_teammembers,
    view_all_order:member?.view_all_order,
    place_on_order_for_client:member?.place_on_order_for_client,
    do_production_work:member?.do_production_work,
    see_the_pricing:member?.see_the_pricing,
    edit_order:member?.edit_order,
    is_admin:member?.is_admin

  })) || [];

  const handleEdit = (record) => {
    console.log(record);
    
    setSelectedTeamMember(record);
    setOpenAddModal1(true);
  };

  const handlePageChange = (page) => {

    setCurrentPage(page);
  };

  const handleDelete = async (record) => {
    
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone. Do you want to delete this category?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const response = await deleteTeamMember(record?.authId).unwrap();
          message.success(response?.message );
        } catch (error) {
          message.error(error?.data?.message);
        }
      },
    });
  };


  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "8%",
    },
    {
      title: "Team Member Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={`${imageUrl}/${record?.profile_image}`} alt={record?.name} />
          <span style={{ marginLeft: 8 }}>{record?.name}</span>
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
      width: "10%",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            shape="circle"
            onClick={() => handleDelete(record)}
            className="bg-[#D80027] h-10 w-10 rounded text-white text-xl"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
      align: "end",
      width: "10%",
    },
  ];

  const navigate = useNavigate();

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
          <span className="text-lg font-semibold">Manage Team Members</span>
        </h1>
        <Input  onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="mb-4">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2A216D] text-white rounded px-11 py-2.5"
        >
          + New Team Member
        </button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }} 
      />
       <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allTeamMember?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        </div>

      <AddTeamMember openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
      <EditTeamMember openAddModal={openAddModal1}
  setOpenAddModal={setOpenAddModal1} selectedTeamMember={selectedTeamMember} />
    </div>
  );
};

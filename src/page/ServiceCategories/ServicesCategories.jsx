import { Input, message, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AddServicesModal } from "./AddServicesModal";
import { EditServicesModal } from "./EditServicesModal";
import { useDeleteServicesCategoryMutation, useGetAllServicesCategoriesQuery } from "../redux/api/serviceApi";

export const ServicesCategories = () => {
  const [searchTerm, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  
  const { data: categoryData, isLoading } = useGetAllServicesCategoriesQuery({searchTerm});
const [deleteService] = useDeleteServicesCategoryMutation()
  
  const data = categoryData?.data?.map((item, index) => ({
    key: item?._id,
    slNo: (index + 1).toString().padStart(2, "0"),
    categoryName: item?.name,
  })) || [];

  const handleEdit = (record) => {
    console.log(record)
    setSelectedCategory(record);
    setOpenAddModal1(true);
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
        const response = await deleteService(record?.key).unwrap();
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
      align: "left",
      width: "10%",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      width: "70%",
    },
    {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div>
        <button
          onClick={() => handleEdit(record)}
          className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
        >
          <EditOutlined />
        </button>
        <button
        onClick={() => handleDelete(record)}
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
    <div className="bg-white p-4 h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Services Categories</span>
        </h1>
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2A216D] text-[white] rounded px-11 py-2.5"
        >
          + New Category
        </button>
      </div>

      <div>
        <Table
          dataSource={data}
          columns={columns}
          loading={isLoading}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
      </div>
      
      <AddServicesModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <EditServicesModal
  openAddModal={openAddModal1}
  setOpenAddModal={setOpenAddModal1}
  selectedCategory={selectedCategory}
/>
    </div>
  );
};

import { Input, message, Modal, Pagination } from "antd";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Table } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { AddPackageModal } from "./AddPackageModal";
import { EditPackageModal } from "./EditPackageModal";
import {
  useDeletePackageMutation,
  useGetAllPackageQuery,
} from "../redux/api/packageApi";
import { useGetProfileQuery } from "../redux/api/userApi";

export const Packeges = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: packageData } = useGetAllPackageQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const [deletePackage] = useDeletePackageMutation();
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Handle details modal
  const handleDetails = (record) => {
    setSelectedPackage(record);
    setOpenDetails(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Are you sure?",
      content:
        "This action cannot be undone. Do you want to delete this category?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const response = await deletePackage(record?.key).unwrap();
          message.success(response.message);
        } catch (error) {
          message.error(error?.data?.message);
        }
      },
    });
  };

  // Prepare table data from API response
  const tableData =
    packageData?.data?.data?.map((item, index) => ({
      key: item?._id,
      slNo: index + 1,
      name: item?.name,
      price: `$${item?.price}`,
      description: item?.descriptions,
      services: item?.services,
      images: item?.package_image,
    })) || [];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "10%",
    },
    {
      title: "Package Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <button
          onClick={() => handleDetails(record)}
          className="bg-[#2A216D] h-10 w-10 rounded text-white text-xl"
        >
          <EyeOutlined />
        </button>
      ),
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
      width: "20%",
    },
  ];

  const { data: profile } = useGetProfileQuery();
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
          <span className="text-lg font-semibold">Packages</span>
        </h1>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          style={{ width: 300 }}
        />
      </div>

      <div className="">
        <div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#2A216D] text-[white] rounded px-11 py-2.5"
          >
            + New Services
          </button>
        </div>
      </div>

      <div className="pt-5">
        <Table dataSource={tableData} columns={columns} pagination={false} />
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={packageData?.data?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      <AddPackageModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      ></AddPackageModal>
      <EditPackageModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      ></EditPackageModal>
      {/* Package Details Modal */}
      <Modal
        centered
        open={openDetails}
        onCancel={() => setOpenDetails(false)}
        footer={null}
        width={600}
      >
        {selectedPackage && (
          <div className="p-4">
            <h2 className="text-center font-bold text-xl mb-6">
              Package Details
            </h2>
            <div className="mb-4">
              <p className="font-semibold">Package Name:</p>
              <p>{selectedPackage?.name}</p>
            </div>
            {profile?.data?.see_the_pricing && (
              <div className="mb-4">
                <p className="font-semibold">Price:</p>
                <p>{selectedPackage?.price}</p>
              </div>
            )}
            <div className="mb-4">
              <p className="font-semibold">Description:</p>
              <p>{selectedPackage?.description}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Services:</p>
              <ul className="list-disc pl-5">
                {selectedPackage?.services?.length > 0 ? (
                  selectedPackage?.services.map((service) => (
                    <li key={service?._id}>{service?.title}</li>
                  ))
                ) : (
                  <p>No services available</p>
                )}
              </ul>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Images:</p>
              <div className="flex gap-3 flex-wrap">
                {selectedPackage?.images?.length > 0 ? (
                  selectedPackage?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Package"
                      className="w-20 h-20 rounded-md"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

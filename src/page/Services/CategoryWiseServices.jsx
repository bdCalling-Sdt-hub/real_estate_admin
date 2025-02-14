import React, { useState } from "react";
import { Table, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDeleteServicesMutation, useGetAllServicesQuery } from "../redux/api/serviceApi";
import { EditServiceMOdal } from "./EditServiceMOdal";

export const CategoryWiseServices = ({category,searchTerm}) => {
  console.log(category)
  
  const [editModal, setEditModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { data: serviceData, isLoading } = useGetAllServicesQuery({category,searchTerm});
const[deleteServices]= useDeleteServicesMutation()
  const data = serviceData?.data?.data?.map((item, index) => ({
    key: item._id,
    slNo: (index + 1).toString().padStart(2, "0"),
    title: item.title,
    price: `${item.price}`,
    description: item.descriptions,
    
    serviceImage: item.service_image,
  })) || [];

  const handleDetails = (record) => {
    setSelectedService(record);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
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
          const response = await deleteServices(record.key).unwrap();
          message.success(response.message );
        } catch (error) {
          message.error(error?.data?.message);
        }
      },
    });
  };
  // Table Columns
  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      width: "5%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      width: "30%",
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
          <button onClick={() => handleEdit(record)} className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl">
            <EditOutlined />
          </button>
          <button onClick={() => handleDelete(record)} className="bg-[#D80027] h-10 w-10 rounded text-white text-xl">
            <DeleteOutlined />
          </button>
        </div>
      ),
      align: "end",
      width: "20%",
    },
  ];

  return (
    <div>
      {/* Table for Services */}
      <Table
        dataSource={data}
        columns={columns}
        loading={isLoading}
        pagination={{
          pageSize: 7,
          showSizeChanger: true,
          pageSizeOptions: ["7", "10", "20"],
        }}
        bordered
        style={{ marginTop: "20px" }}
      />

      {/* Service Details Modal */}
      <Modal
        title="Service Details"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {selectedService ? (
          <div>
            <div className="flex justify-between">
              <h1>Service Name:</h1>
              <h1>{selectedService.title}</h1>
            </div>
            <div className="flex justify-between">
              <h1>Category:</h1>
              <h1>{selectedService.category}</h1>
            </div>
            <div className="flex justify-between">
              <h1>Price:</h1>
              <h1>{selectedService.price}</h1>
            </div>
            <p className="text-lg font-semibold mt-3">Description:</p>
            <p>{selectedService.description}</p>
            <p className="text-lg font-semibold mb-2 mt-4">Photos</p>
            <div className="grid grid-cols-4 gap-3">
              {selectedService.serviceImage.map((img, index) => (
                <img key={index} className="h-[100px]" src={img} alt="Service" />
              ))}
            </div>
          </div>
        ) : (
          <p>No details available</p>
        )}
      </Modal>
      <EditServiceMOdal editModal={editModal} setEditModal={setEditModal} selectedCategory={selectedCategory}/>
    </div>
  );
};

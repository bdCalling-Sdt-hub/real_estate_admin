import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

import { Table,  Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { AddPackageModal } from './AddPackageModal';
import { EditPackageModal } from './EditPackageModal';
import img from '../../assets/header/11.png'
import img1 from '../../assets/header/22.png'
export const Packeges = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);

   const [opendetails, setOpendetails] = useState(false);
    const onFinish = async (values) => {
      console.log(values);
    };
  const data = [
    {
      key: "1",
      slNo: "#1233",
      title: "Drone Photo",
      price: "$580",
      description: "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "2",
      slNo: "#1233",
      title: "3D Matterport",
      price: "$635",
      description: "Our best-selling package featuring our top-rated services...",
    },
    {
      key: "3",
      slNo: "#1233",
      title: "Twilight Photos",
      price: "$1245",
      description: "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "4",
      slNo: "#1233",
      title: "Drone Photo",
      price: "$455",
      description: "Our best-selling package featuring our top-rated services...",
    },
    {
      key: "5",
      slNo: "#1233",
      title: "3D Matterport",
      price: "$655",
      description: "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "6",
      slNo: "#1233",
      title: "Twilight Photos",
      price: "$705",
      description: "Our best-selling package featuring our top-rated services...",
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
      width: "40%",
    },
    {
          title: "Details",
          key: "details",
          render: () => (
            <button
              onClick={() => setModal2Open1(true)}
              shape="circle"
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
          render: () => (
            <div>
              <button
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
          <span className="text-lg font-semibold">Packages</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        
        <div>
          <button onClick={() => setOpenAddModal(true)}  className="bg-[#2A216D] text-[white] rounded px-11 py-2.5">
            + New Services
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
    <AddPackageModal openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}></AddPackageModal>
    <EditPackageModal openAddModal={openAddModal1}
        setOpenAddModal={setOpenAddModal1}></EditPackageModal>
        <Modal
  centered
  open={opendetails}
  onCancel={() => setOpendetails(false)}
  footer={null}
  width={600}
>
  <div className="p-4">
    <h2 className="text-center font-bold text-xl mb-6">Package Details</h2>
    <div className="mb-4">
      <p className="font-semibold">Package Name:</p>
      <p>Premium Packages</p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Price:</p>
      <p>$1050</p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Description:</p>
      <p>
        Our most popular package including our most popular service and
        best-selling package featuring our top-rated service.
      </p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Services/Products:</p>
      <ul className="list-disc pl-5">
        <li>Twilight Photos</li>
        <li>3D Matterport</li>
        <li>Drone Photo</li>
        <li>Floor plan</li>
      </ul>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Photos:</p>
      <div className="flex gap-3">
        <img src={img} alt="Package Photo" className="w-20 h-20 rounded-md" />
        <img src={img1} alt="Package Photo" className="w-20 h-20 rounded-md" />
        <img src={img} alt="Package Photo" className="w-20 h-20 rounded-md" />
        <img src={img1} alt="Package Photo" className="w-20 h-20 rounded-md" />
      </div>
    </div>
  </div>
</Modal>

    </div>
  )
}

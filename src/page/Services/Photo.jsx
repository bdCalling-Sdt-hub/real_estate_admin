import React, { useState } from "react";
import { Table, Avatar, Tag, Button, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import img1 from "../../assets/header/11.png";
import img2 from "../../assets/header/22.png";
import img3 from "../../assets/header/33.png";
import img4 from "../../assets/header/44.png";
export const Photo = () => {
  const [modal2Open1, setModal2Open1] = useState(false);
  const data = [
    {
      key: "1",
      slNo: "#1233",
      title: "Drone Photo",
      price: "$580",
      description:
        "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "2",
      slNo: "#1233",
      title: "3D Matterport",
      price: "$635",
      description:
        "Our best-selling package featuring our top-rated services...",
    },
    {
      key: "3",
      slNo: "#1233",
      title: "Twilight Photos",
      price: "$1245",
      description:
        "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "4",
      slNo: "#1233",
      title: "Drone Photo",
      price: "$455",
      description:
        "Our best-selling package featuring our top-rated services...",
    },
    {
      key: "5",
      slNo: "#1233",
      title: "3D Matterport",
      price: "$655",
      description:
        "Help clients visualize your listing and its surroundings...",
    },
    {
      key: "6",
      slNo: "#1233",
      title: "Twilight Photos",
      price: "$705",
      description:
        "Our best-selling package featuring our top-rated services...",
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

  const handleFinish = async (values) => {
    console.log(values);
  };

  return (
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

      <Modal
        title="Details"
        centered
        open={modal2Open1}
        onCancel={() => setModal2Open1(false)}
        bodyStyle={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
        footer={null}
      >
        <div>
          <div className="flex justify-between space-y-2">
            <h1>Package Name:</h1>
            <h1>Twilight Photos</h1>
          </div>
          <div className="flex justify-between space-y-2">
            <h1>Package Name:</h1>
            <h1>Twilight Photos</h1>
          </div>
          <p className="text-lg font-semibold mt-3">Description:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus, quia.
          </p>
          <p className="text-lg font-semibold mb-2 mt-4">Photos</p>
          <div className="grid grid-cols-4 gap-3">
            <img className="h-[100px]" src={img1} alt="" />
            <img className="h-[100px]" src={img2} alt="" />
            <img className="h-[100px]" src={img3} alt="" />
            <img className="h-[100px]" src={img4} alt="" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

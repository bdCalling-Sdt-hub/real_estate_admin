import { Input } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AddServicesModal } from './AddServicesModal';
import { EditServicesModal } from './EditServicesModal';

export const ServicesCategories = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddModal1, setOpenAddModal1] = useState(false);
  const data = [
    {
      key: "1",
      slNo: "01",
      categoryName: "Photos",
    },
    {
      key: "2",
      slNo: "02",
      categoryName: "Videos",
    },
    {
      key: "3",
      slNo: "03",
      categoryName: "Floorplans",
    },
    {
      key: "4",
      slNo: "04",
      categoryName: "Artist Impressions",
    },
    {
      key: "5",
      slNo: "05",
      categoryName: "Energy Labels",
    },
    {
      key: "6",
      slNo: "06",
      categoryName: "Virtual Tour",
    },
  ];

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
          <span className="text-lg font-semibold">Services Categories</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <div>
          <button onClick={() => setOpenAddModal(true)} className="bg-[#2A216D] text-[white] rounded px-11 py-2.5">
            + New Category
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
      <AddServicesModal openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}></AddServicesModal>
      <EditServicesModal openAddModal={openAddModal1}
        setOpenAddModal={setOpenAddModal1}></EditServicesModal>
    </div>
  );
};

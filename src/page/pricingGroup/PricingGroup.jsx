import { Input, message, Modal, Pagination } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeletePricingMutation, useGetAllPricingGroupQuery } from '../redux/api/packageApi';

export const PricingGroup = () => {
  const [searchTerm, setSearch] = useState("");
  const[deletePricing] = useDeletePricingMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: pricingGroupData } = useGetAllPricingGroupQuery({searchTerm,page: currentPage,
    limit: pageSize,}); 



  const pricingGroups = pricingGroupData?.data?.data?.map(group => ({
    key: group?._id,
    slNo: `#${group?._id.slice(0, 4)}`, 
    groupName: group?.name,
    numberOfClients: group?.clients?.length || 0,
  })) || [];

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
          const response = await deletePricing(record?.key).unwrap();
          message.success(response.message );
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
      width: "15%",
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      align: "center",
      width: "50%",
    },
    {
      title: "Number of Clients",
      dataIndex: "numberOfClients",
      key: "numberOfClients",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Link to={`/dashboard/pricing-group/edit-pricing-group/${record?.key}`}>
            <button
              shape="circle"
              className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
            >
              <EditOutlined />
            </button>
          </Link>
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
          <span className="text-lg font-semibold">Pricing Groups</span>
        </h1>
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <div>
          <Link to={'/dashboard/pricing-group/add-pricing-group'}>
            <button className="bg-[#2A216D] text-[white] rounded px-11 py-2.5">
              + New Pricing Group
            </button>
          </Link>
        </div>
      </div>

      <div className="">
        <Table
          dataSource={pricingGroups} // Use dynamic data from API
          columns={columns}
          pagination={false}
        />
        <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={pricingGroupData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        </div>
      </div>
    </div>
  );
};

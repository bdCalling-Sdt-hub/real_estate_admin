import { Checkbox, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from "antd";

export const InvoiceOrder = () => {
  const [opendetails, setOpendetails] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const dataa = [
    { key: 1, orderId: "#12333", orderDate: "12/04/24", total: 546 },
    { key: 2, orderId: "#12333", orderDate: "12/04/24", total: 783 },
    { key: 3, orderId: "#12333", orderDate: "12/04/24", total: 246 },
    { key: 4, orderId: "#12333", orderDate: "12/04/24", total: 246 },
    { key: 5, orderId: "#12333", orderDate: "12/04/24", total: 246 },
  ];

  const columnss = [
    {
      title: "Select",
      dataIndex: "select",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(e.target.checked, record)}
        />
      ),
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total) => `$${total}`,
    },
  ];

  const handleCheckboxChange = (checked, record) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, record]);
    } else {
      setSelectedRows((prev) => prev.filter((row) => row.key !== record.key));
    }
  };

  const calculateTotalPrice = () => {
    return selectedRows.reduce((sum, row) => sum + row.total, 0);
  };
  const data = [
    {
      key: "1",
      slNo: "#1233",
      companyName: "Louis Vuitton",
      logo: "https://via.placeholder.com/20",
      totalOrder: "4",
    },
    {
      key: "2",
      slNo: "#1233",
      companyName: "Bank of America",
      logo: "https://via.placeholder.com/20",
      totalOrder: "3",
    },
    {
      key: "3",
      slNo: "#1233",
      companyName: "Nintendo",
      logo: "https://via.placeholder.com/20",
      totalOrder: "6",
    },
    {
      key: "4",
      slNo: "#1233",
      companyName: "Pizza Hut",
      logo: "https://via.placeholder.com/20",
      totalOrder: "2",
    },
    {
      key: "5",
      slNo: "#1233",
      companyName: "McDonald's",
      logo: "https://via.placeholder.com/20",
      totalOrder: "3",
    },
    {
      key: "6",
      slNo: "#1233",
      companyName: "Sony",
      logo: "https://via.placeholder.com/20",
      totalOrder: "8",
    },
    {
      key: "7",
      slNo: "#1233",
      companyName: "Johnson & Johnson",
      logo: "https://via.placeholder.com/20",
      totalOrder: "1",
    },
  ];

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
      align: "left",
      width: "25%",
    },
    {
      title: "Company/Client",
      dataIndex: "companyName",
      key: "companyName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.logo}
            alt={text}
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          {text}
        </div>
      ),
      align: "start",
      width: "25%",
    },
    {
      title: "Total Order",
      dataIndex: "totalOrder",
      key: "totalOrder",
      align: "center",
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
        onClick={() => setOpendetails(true)}
          type="primary"
          style={{ backgroundColor: "#2A216D", border: "none" }}
        >
          Invoice
        </Button>
      ),
      align: "right",
      width: "25%",
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
          <span className="text-lg font-semibold">Manage Invoices</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
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
      <Modal
      centered
      open={opendetails}
      onCancel={() => setOpendetails(false)}
      footer={null}
      width={600}
    >
      <div className="p-4">
        <h2 className="text-center font-bold mb-6">Invoice Order</h2>
        <Table
          columns={columnss}
          dataSource={dataa}
          pagination={false}
          bordered={false}
          className="mb-4"
        />
        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span>Total Price:</span>
          <span>${calculateTotalPrice()}</span>
        </div>
        <Button
          type="primary"
          block
          className="bg-[#2A216D] text-white rounded-md"
        >
          Create Invoice
        </Button>
      </div>
    </Modal>
    </div>
  );
};

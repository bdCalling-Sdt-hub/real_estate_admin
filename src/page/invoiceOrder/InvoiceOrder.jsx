import { Checkbox, Form, Input, message, Modal, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from "antd";
import { useAddInvoiceOrderMutation, useGetInvoiceOrderQuery } from '../redux/api/reportApi';
import { imageUrl } from '../redux/api/baseApi';

export const InvoiceOrder = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: invoiceOrderData } = useGetInvoiceOrderQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const [addInvoiceOrder] = useAddInvoiceOrderMutation();

  const invoiceOrder =
    invoiceOrderData?.data?.result?.map((invoice, index) => ({
      key: index + 1,
      id: invoice._id,
      slNo: `#${index + 1}`,
      name: invoice.name,
      totalUnpaidOrders: invoice.totalUnpaidOrders,
      profile_image: invoice.profile_image,
      unpaidOrderDetails: invoice.unpaidOrderDetails, 
    })) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [opendetails, setOpendetails] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedInvoiceDetails, setSelectedInvoiceDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientId, setClientId] = useState("");

  const handleCheckboxChange = (checked, record) => {

    if (checked) {
      setSelectedRows((prev) => [...prev, record]);
      setTotalAmount((prevTotal) => prevTotal + record.totalAmount); 
    } else {
      
      setSelectedRows((prev) => prev.filter((row) => row.key !== record.key));
      setTotalAmount((prevTotal) => prevTotal - record.totalAmount); 
    }
  };

  const handleCreateInvoice = async () => {
    const orderIds = selectedRows.map((row) => row._id);
    const invoiceData = {
      totalAmount: totalAmount,
      orderIds: orderIds,
      clientId: clientId, 
    };

    try {
      const response = await addInvoiceOrder(invoiceData); 
      setSelectedRows([]); 
      message.success(response?.message)
      setOpendetails(false); 
      setTotalAmount(0); 
      
    } catch (error) {
      message.error(error?.data?.message)
      console.error("Error creating invoice:", error);
    }
  };

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
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${imageUrl}/${record.profile_image}`}
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
      dataIndex: "totalUnpaidOrders",
      key: "totalUnpaidOrders",
      align: "center",
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedInvoiceDetails(record.unpaidOrderDetails);
            setClientId(record.id);
            setOpendetails(true);
          }}
          type="primary"
          style={{ backgroundColor: "#2A216D", border: "none" }}
        >
          Invoice
        </Button>
      ),
      align: "right",
      width: "25%",
    }
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
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." style={{ width: 300 }} />
      </div>

      <div className="">
        <Table
          dataSource={invoiceOrder}
          columns={columns}
          pagination={false}
        />
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={invoiceOrderData?.data?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Modal
        centered
        open={opendetails}
        onCancel={() => setOpendetails(false)}
        footer={null}
        width={900}
      >
        <div className="p-4">
          <h2 className="text-center font-bold mb-6">Invoice Order</h2>
          <Table
            columns={[
              {
                title: "Select",
                dataIndex: "select",
                render: (_, record) => (
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e.target.checked, record)}
                  />
                ),
              },
              { title: "Order ID", dataIndex: "_id", key: "_id" },
              { title: "Order Date", dataIndex: "createdAt", key: "createdAt" },
              { title: "Amount", dataIndex: "totalAmount", key: "totalAmount", render: (text) => `$${text}` },
            ]}
            dataSource={selectedInvoiceDetails}
            pagination={false}
            bordered={false}
            className="mb-4"
          />
          <div className="flex justify-between items-center font-bold text-lg mb-4">
            <span>Total Price:</span>
            <span>{`$${totalAmount}`}</span>
          </div>
          <Button
            type="primary"
            block
            className="bg-[#2A216D] text-white rounded-md"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
        </div>
      </Modal>
    </div>
  );
}; 

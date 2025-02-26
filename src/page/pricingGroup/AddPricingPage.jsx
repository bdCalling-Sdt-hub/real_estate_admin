import React, { useState } from "react";
import { Form, Input, Button, Select, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAddPricingMutation, useGetAllClientQuery, useGetServicesAllQuery } from "../redux/api/packageApi";
import { imageUrl } from "../redux/api/baseApi";

export const AddPricingPage = () => {
  const navigate = useNavigate();
  const { data: clientData } = useGetAllClientQuery();
  const { data: allServicesData } = useGetServicesAllQuery();
  const [addPricingGroup] = useAddPricingMutation();
  const [form] = Form.useForm();
  
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  const clientOptions = clientData?.data?.map((client) => ({
    label: client?.name,
    value: client?._id,
  })) || [];

  const serviceOptions = allServicesData?.data?.map((service) => ({
    label: service?.title,
    value: service?._id,
    price: service?.price,
  })) || [];

  // Handle client selection
  const handleClientSelect = (clientIds) => {
    setSelectedClientIds(clientIds);
  };

  // Handle service selection
  const handleServiceSelect = (serviceIds) => {
    setSelectedServiceIds(serviceIds);
    const selectedServicesData = allServicesData?.data?.filter(service =>
      serviceIds.includes(service._id)
    );
    setSelectedServices(selectedServicesData);
  };

  // Handle client removal
  const handleRemoveClient = (clientId) => {
    const updatedClients = selectedClientIds.filter((id) => id !== clientId);
    setSelectedClientIds(updatedClients);
  };

  const handleSubmit = async (values) => {
    // Preparing the data with special_price from the input fields
    const data = {
      name: values.pricingGroupName, 
      clients: selectedClientIds, 
      services: selectedServices.map((service) => ({
        serviceId: service._id, 
        special_price: service.special_price, 
      })),
    };

   

    try {
      const res = await addPricingGroup(data);
      message.success(res?.data?.message);
      
    } catch (error) {
      message.error(error?.data?.data?.message)
      console.error("Error creating pricing group:", error);
      message.error("An error occurred while creating the pricing group.");
    }
  };

  const pricingColumns = [
    {
      title: "Service Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Special Price",
      dataIndex: "special_price",
      key: "special_price",
      render: (text, record, index) => (
        <Input
  defaultValue={record.price} 
  onChange={(e) => {
    const newServices = [...selectedServices];


    const updatedSpecialPrice = parseFloat(e.target.value); 

    // Check if the value is a valid number
    if (isNaN(updatedSpecialPrice)) {
      message.error("Invalid special_price: Must be a number.")
    
      return; // Don't update the state if it's not a valid number
    }

    
    newServices[index] = { 
      ...newServices[index], 
      special_price: updatedSpecialPrice 
    };

    setSelectedServices(newServices);

   
   
  }}
/>

      

      ),
    },
  ];
  

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Manage Ticket</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Add Pricing Group</h1>

        {/* Pricing Group Name */}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Pricing Group Name" name="pricingGroupName">
            <Input className="py-2" placeholder="Input here" />
          </Form.Item>

          {/* Associated Clients */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Associated Clients</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select clients"
              value={selectedClientIds}
              onChange={handleClientSelect}
              options={clientOptions}
            />
            <ul>
              {selectedClientIds?.map((clientId) => {
                const client = clientData?.data?.find((c) => c._id === clientId);
                return client ? (
                  <li key={client?._id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={`${imageUrl}/${client?.profile_image}`}
                        alt={client?.name}
                        className="w-8 h-8 rounded"
                      />
                      <span>{client?.name}</span>
                    </div>
                    <Button type="link" danger onClick={() => handleRemoveClient(client?._id)}>
                      Remove
                    </Button>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          {/* Select Services */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Add Services/Products</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select services"
              value={selectedServiceIds}
              onChange={handleServiceSelect}
              options={serviceOptions}
            />
          </div>

          {/* Selected Services Table */}
          {selectedServices.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Selected Services</h3>
              <Table
                columns={pricingColumns}
                dataSource={selectedServices}
                pagination={false}
                rowKey="value"
                bordered
              />
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="mt-4 bg-[#2A216D] text-white p-2 rounded">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

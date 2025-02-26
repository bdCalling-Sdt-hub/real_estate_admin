import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Table, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetAllClientQuery, useGetServicesAllQuery, useGetSinglePriceQuery, useUpdatePricingMutation } from "../redux/api/packageApi";
import { imageUrl } from "../redux/api/baseApi";

export const EditPricingPage = () => {
  const { id } = useParams(); 
  const { data: singlePricing, isLoading } = useGetSinglePriceQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  const navigate = useNavigate();
  const { data: clientData } = useGetAllClientQuery();
  const { data: allServicesData } = useGetServicesAllQuery();
  const [updatePricing] = useUpdatePricingMutation();
  
  const [form] = Form.useForm();
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  useEffect(() => {
    if (!isLoading && singlePricing) {
      form.setFieldsValue({
        name: singlePricing?.data?.name,
      });

      setSelectedClientIds(singlePricing?.data?.clients?.map(client => client?._id));
      setSelectedServiceIds(singlePricing.data?.services?.map(service => service?.serviceId?._id));
      
      // Initialize the special prices
      const servicesWithPrice = singlePricing?.data?.services?.map(service => ({
        ...service.serviceId,
        special_price: service?.special_price,  // Add the special_price to each service
      }));
      setSelectedServices(servicesWithPrice);
    }
  }, [isLoading, singlePricing, form]);

  const handleClientSelect = (clientIds) => {
    setSelectedClientIds(clientIds);
  };

  const handleServiceSelect = (serviceIds) => {
    setSelectedServiceIds(serviceIds);
    const selectedServicesData = allServicesData?.data?.filter(service =>
      serviceIds.includes(service?._id)
    );
    setSelectedServices(selectedServicesData);
  };

  const handleRemoveClient = (clientId) => {
    const updatedClients = selectedClientIds?.filter((id) => id !== clientId);
    setSelectedClientIds(updatedClients);
  };

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      clients: selectedClientIds,
      services: selectedServices.map((service, index) => ({
        serviceId: service?._id,
        special_price: Number(service.special_price),  
      })),
    };

    try {
      await updatePricing({ id, data });
      message.success("Pricing group updated successfully");
    } catch (error) {
      message.error("Failed to update pricing group");
    }
  };

  const pricingColumns = [
    {
      title: "Service Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <span>{record?.title}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <span>{record?.price}</span>,
    },
    {
      title: "Special Price",
      dataIndex: "special_price",
      key: "special_price",
      render: (text, record, index) => {
        return (
          <Input
          type="number"
            value={record.special_price } 
            onChange={(e) => {
              const updatedServices = [...selectedServices];
              updatedServices[index] = {
                ...updatedServices[index],
                special_price: (e.target.value), 
              };
              setSelectedServices(updatedServices);  
            }}
          />
        );
      }
    }
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
        <h1 className="text-2xl font-semibold mb-6">Edit Pricing Group</h1>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Pricing Group Name */}
          <Form.Item label="Pricing Group Name" name="name">
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
              options={clientData?.data?.map((client) => ({
                label: client?.name,
                value: client?._id,
              }))}
            />
            <ul>
              {selectedClientIds.map((clientId) => {
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
              options={allServicesData?.data?.map((service) => ({
                label: service?.title,
                value: service?._id,
                price: service?.price,
              }))}
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

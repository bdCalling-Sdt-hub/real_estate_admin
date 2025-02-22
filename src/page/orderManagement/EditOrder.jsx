import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Button,
  Upload,
  Dropdown,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { menu } from "./constant";
import {
  useGetOrderByIdQuery,
  useGetClientAgentsQuery,
  useUpdateOrderMutation,
} from "../redux/api/ordersApi";
import Loading from "../../components/Loading";
import { imageUrl } from "../redux/api/baseApi";

export const EditOrder = () => {
  const [contactAgent, setContactAgent] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const { data, isLoading } = useGetOrderByIdQuery(id);
  const { data: agents } = useGetClientAgentsQuery(data?.data?.clientId?._id);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  useEffect(() => {
    if (data?.data) {
      setContactAgent(data.data.contactAgent ? "yes" : "no");
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.uploadFiles) {
      setFileList(
        data?.data?.uploadFiles.map((file) => ({
          url: file,
        }))
      );
    }
  }, [data]);

  if (isLoading) return <Loading />;

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    const selectedPrevFiles = fileList
      .filter((file) => data?.data?.uploadFiles?.includes(file.url))
      .map((file) => file.url);
    const newFiles = fileList.filter((file) => file.name);
    const formJSON = {
      pickupKeyOffice: values.pickupKeys === "yes" ? true : false,
      contactAgent: values.contactAgent === "yes" ? true : false,
      contactOwner: values.contactAgent === "no" ? true : false,
      address: {
        zipCode: values.zipCode,
        city: values.city,
        streetAddress: values.streetAddress,
        streetNumber: values.streetNumber,
        streetName: values.streetNumber,
      },
      contactInfo: {
        name1: values.propertyOwnerName,
        email1: values.email,
        phone1: values.mobilePhone,
      },
      linkedAgents: values.linkedAgents,
      descriptions: values.description,
      uploadFiles: selectedPrevFiles,
    };
    formData.append("uploadFiles", newFiles);
    formData.append("data", JSON.stringify(formJSON));

    try {
      const res = await updateOrder({ id, data: formData });
      if (res.data) {
        message.success("Order updated successfully");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white p-4">
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
          <span className="text-lg font-semibold">Edit Order</span>
        </h1>

        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            className="border border-black rounded-full text-black flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            Actions <HiOutlineDotsVertical className="ml-2" />
          </Button>
        </Dropdown>
      </div>
      <div className="text-2xl font-semibold mt-11 text-center">Edit Order</div>
      <div className="p-8 max-w-4xl mx-auto  rounded-lg">
        {/* Client/Company Section */}
        {/* Client/Company Section */}
        <div className="flex justify-between mb-8">
          <div>
            <span className="font-bold">Client/Company:</span>
          </div>
          <div>{data?.data?.clientId?.name}</div>
        </div>

        {/* Address Details */}
        <h3 className="font-semibold text-lg mb-4">Address Details</h3>
        <Form layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[{ required: true }]}
              initialValue={data?.data?.address?.zipCode}
            >
              <Input placeholder="Input here" />
            </Form.Item>
            <Form.Item
              name="streetNumber"
              label="Street Number"
              rules={[{ required: true }]}
              initialValue={data?.data?.address?.streetName}
            >
              <Input placeholder="Input here" />
            </Form.Item>
          </div>
          <Form.Item
            name="streetAddress"
            label="Street Address"
            rules={[{ required: true }]}
            initialValue={data?.data?.address?.streetAddress}
          >
            <Input placeholder="Input here" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true }]}
            initialValue={data?.data?.address?.city}
          >
            <Input placeholder="Input here" />
          </Form.Item>
          <Form.Item
            name="pickupKeys"
            label="Pickup keys at real estate office?"
            initialValue={data?.data?.pickupKeyOffice ? "yes" : "no"}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Contact Info */}
          <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
          <Form.Item name="contactAgent">
            <Radio.Group
              onChange={(e) => setContactAgent(e.target.value)}
              value={contactAgent}
              defaultValue={data?.data?.contactAgent ? "yes" : "no"}
            >
              <Radio value="no">Please Contact Property Owner</Radio>
              <Radio value="yes">Please Contact Real Estate Agent</Radio>
            </Radio.Group>
          </Form.Item>
          {contactAgent === "no" && (
            <>
              <h4 className="font-semibold mb-2">Property Owner Details</h4>
              <Form.Item
                name="propertyOwnerName"
                label="Name Property Owner"
                initialValue={data?.data?.contactInfo?.name1}
              >
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                initialValue={data?.data?.contactInfo?.email1}
              >
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item
                name="mobilePhone"
                label="Mobile Phone"
                initialValue={data?.data?.contactInfo?.phone1}
              >
                <Input placeholder="Input here" />
              </Form.Item>
            </>
          )}

          {contactAgent === "yes" && (
            <>
              <h3 className="font-semibold text-lg mb-4">
                Linked Real Estate Agent
              </h3>
              <Form.Item
                name="linkedAgents"
                initialValue={
                  data?.data?.linkedAgents?.length > 0 &&
                  data?.data?.linkedAgents?.map((agent) => agent._id)
                }
              >
                <Checkbox.Group>
                  <div className="grid grid-cols-2 gap-4">
                    {agents?.data?.length > 0 &&
                      agents?.data?.map((agent) => (
                        <Checkbox value={agent._id}>
                          <div className="flex items-center">
                            <img
                              src={
                                agent?.profile_image
                                  ? `${imageUrl}/${agent?.profile_image}`
                                  : `https://ui-avatars.com/api/?name=${agent?.name}`
                              }
                              alt={agent?.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            {agent.name}
                          </div>
                        </Checkbox>
                      ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </>
          )}

          {/* File & Description */}
          <h3 className="font-semibold text-lg mb-4">File & Description</h3>
          <Form.Item label="Uploaded File">
            <div className="flex gap-4 items-center">
              <div>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            initialValue={data?.data?.descriptions}
          >
            <Input.TextArea rows={4} placeholder="Input here" />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              className="rounded w-72"
              onClick={() => console.log("Cancel")}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded w-72 bg-[#2A216D]"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

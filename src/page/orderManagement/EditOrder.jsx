import React, { useState } from "react";
import { Form, Input, Radio, Checkbox, Button, Upload, Dropdown } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { menu } from "./constant";
import { useGetOrderByIdQuery } from "../redux/api/ordersApi";
import Loading from "../../components/Loading";

export const EditOrder = () => {
  const [contactAgent, setContactAgent] = useState("no");
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const { data, isLoading } = useGetOrderByIdQuery(id);
  if (isLoading) return <Loading />;
  console.log(data);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
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
  const onFinish = (values) => {
    console.log(values);
    const data = {
      pickupKeyOffice: values.pickupKeys === "yes" ? true : false,
      contactAgent: values.contactAgent,
      contactOwner: values.contactAgent === "false" ? true : false,
      address: values.address,
      contactInfo: values.contactInfo,
      // linkedAgents:
      //   values.contactAgent === "true" ? [values.linkedAgents._id] : [],
      descriptions: values.description,
      // totalAmount: values.services.reduce((acc, curr) => acc + curr.price, 0),
      // serviceIds: serviceIds,
      // packageIds: packageIds,
    };
    // formDataForAPI.append("uploadFiles", formData.uploadFiles);
    // formDataForAPI.append("data", JSON.stringify(data));
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
            initialValue={data?.data?.pickupKeyOffice}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Contact Info */}
          <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
          <Form.Item name="contactPreference">
            <Radio.Group
              onChange={(e) => setContactAgent(e.target.value)}
              value={contactAgent}
              defaultValue={contactAgent}
            >
              <Radio value="no">Please Contact Property Owner</Radio>
              <Radio value="yes">Please Contact Real Estate Agent</Radio>
            </Radio.Group>
          </Form.Item>
          {contactAgent === "no" && (
            <>
              <h4 className="font-semibold mb-2">Property Owner Details</h4>
              <Form.Item name="propertyOwnerName" label="Name Property Owner">
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input placeholder="Input here" />
              </Form.Item>
              <Form.Item name="mobilePhone" label="Mobile Phone">
                <Input placeholder="Input here" />
              </Form.Item>
            </>
          )}

          {contactAgent === "yes" && (
            <>
              <h3 className="font-semibold text-lg mb-4">
                Linked Real Estate Agent
              </h3>
              <Form.Item name="linkedAgents">
                <Checkbox.Group>
                  <div className="grid grid-cols-2 gap-4">
                    <Checkbox value="Darlene Robertson">
                      <div className="flex items-center">
                        <img
                          src="https://i.pravatar.cc/40?img=1"
                          alt="Darlene Robertson"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        Darlene Robertson
                      </div>
                    </Checkbox>
                    <Checkbox value="Jerome Bell">
                      <div className="flex items-center">
                        <img
                          src="https://i.pravatar.cc/40?img=2"
                          alt="Jerome Bell"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        Jerome Bell
                      </div>
                    </Checkbox>
                    <Checkbox value="Dianne Russell">
                      <div className="flex items-center">
                        <img
                          src="https://i.pravatar.cc/40?img=3"
                          alt="Dianne Russell"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        Dianne Russell
                      </div>
                    </Checkbox>
                    <Checkbox value="Cameron Williamson">
                      <div className="flex items-center">
                        <img
                          src="https://i.pravatar.cc/40?img=4"
                          alt="Cameron Williamson"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        Cameron Williamson
                      </div>
                    </Checkbox>
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
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </div>
            </div>
          </Form.Item>
          <Form.Item name="description" label="Description">
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

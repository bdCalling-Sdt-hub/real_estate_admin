import React, { useState } from "react";
import { Form, Input, Checkbox, Modal, Select } from "antd";
import { IoCameraOutline } from "react-icons/io5";

export const AddTeamMember = ({ openAddModal, setOpenAddModal }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file ? URL.createObjectURL(file) : null);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">
          Add Team Member
        </h2>
        <Form layout="vertical">
          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imgUpload"
              style={{ display: "none" }}
            />
            <img
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #e5e7eb",
              }}
              src={image || "https://via.placeholder.com/140"}
              alt="Client Profile"
            />
            <label
              htmlFor="imgUpload"
              className="
                absolute bottom-6 right-6
                bg-[#2A216D]
                rounded-full
                w-8 h-8
                flex items-center justify-center
                cursor-pointer
                border border-gray-300 shadow-sm
                text-xl
              "
            >
              <IoCameraOutline className="text-white" />
            </label>
          </div>

          <Form.Item
            label="Team Member Name"
            name="member"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>
          <Form.Item
          label="Role"
          name="phone"
          rules={[
            { required: true, message: "Please enter the phone number" },
          ]}
          >
          <Select
            placeholder="Role"
            style={{
              width: "100%",
              fontSize: "16px",
              padding: "0px",
              
            }}
            options={[
              { label: "Photographer", value: "Photographer" },
          
            ]}
          />
          </Form.Item>

          <Form.Item
          label="Select Services"
          name="phone"
          rules={[
            { required: true, message: "Please enter the phone number" },
          ]}>
          <Select
            placeholder="Please select"
            style={{
              width: "100%",
              fontSize: "16px",
              padding: "0px",
              
            }}
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
          </Form.Item>

          <Form.Item label="Give Access To">
            <div className="flex flex-col gap-3">
              <Checkbox> Email Notifications </Checkbox>
              <Checkbox> Email Invoices </Checkbox>
            </div>
          </Form.Item>

          <div className="flex  gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
            >
              Add
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

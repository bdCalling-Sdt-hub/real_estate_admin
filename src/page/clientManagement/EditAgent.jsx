import React, { useState, useEffect } from "react";
import { Avatar, Form, Input, message, Modal, Upload } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { imageUrl } from "../redux/api/baseApi";
import { useUpdateAgentManagementMutation } from "../redux/api/clientManageApi";
import { FaCamera } from "react-icons/fa6";
export const EditAgent = ({
  openAddModal,
  setOpenAddModal,
  selectAgentManagement,
}) => {
  const [form] = Form.useForm();
  const [updateAgent] = useUpdateAgentManagementMutation();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (selectAgentManagement && openAddModal) {
      form.setFieldsValue({
        name: selectAgentManagement?.name,
        email: selectAgentManagement?.email,
        address: selectAgentManagement?.address,
        phone: selectAgentManagement?.phone,
      });
      setProfilePic(selectAgentManagement?.profile_image || null);
    }
  }, [selectAgentManagement, openAddModal]);

  useEffect(() => {
    if (!openAddModal) {
      form.resetFields();

      setProfilePic(null);
    }
  }, [openAddModal]);

  const handleImageChange = (e) => {
    if (e.file && e.file.originFileObj) {
      setProfilePic(e.file.originFileObj);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone);
    formData.append("address", values.address);

    if (profilePic instanceof File) {
      formData.append("profile_image", profilePic);
    }

    try {
      const response = await updateAgent({
        data: formData,
        userId: selectAgentManagement?.key,
        authId: selectAgentManagement?.authId,
      }).unwrap();

      message.success(response?.message);
      setOpenAddModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Error updating agent");
      console.error("Error editing agent:", error);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={600}
      destroyOnClose
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit Agent</h2>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <Avatar
              size={140}
              src={
                profilePic
                  ? profilePic instanceof File
                    ? URL.createObjectURL(profilePic)
                    : `${imageUrl}/${profilePic}`
                  : null
              }
              className="border-4 border-highlight shadow-xl"
            />
            <Upload
              showUploadList={false}
              accept="image/*"
              maxCount={1}
              onChange={handleImageChange}
              className="absolute bottom-1 right-2 bg-white px-2 py-1 rounded-full cursor-pointer"
            >
              <FaCamera className="text-accent w-4 h-4 mt-1" />
            </Upload>
          </div>

          <Form.Item
            label="Agent Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input className="py-3" placeholder="Input here" disabled />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
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

          <div className="flex gap-3 mt-4">
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
              Save
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

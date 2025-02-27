import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Modal, message, Avatar, Upload, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { useUpdateClientManagementMutation } from "../redux/api/clientManageApi";
import { imageUrl } from "../redux/api/baseApi";
import { FaCamera } from "react-icons/fa6";
export const EditClientModal = ({
  openAddModal,
  setOpenAddModal,
  selectClientManagement,
}) => {
  const [updateClient] = useUpdateClientManagementMutation();
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [emailInvoice, setEmailInvoice] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectClientManagement && openAddModal) {
      form.setFieldsValue({
        name: selectClientManagement?.name,
        email: selectClientManagement?.email,
        address: selectClientManagement?.address,
        phone: selectClientManagement?.phone,
      });

      setEmailNotifications(
        selectClientManagement?.email_notifications || false
      );
      setEmailInvoice(selectClientManagement?.email_invoice || false);
      setProfilePic(selectClientManagement?.profile_image || null);
    }
  }, [selectClientManagement, openAddModal]);

  // Reset values when modal closes
  useEffect(() => {
    if (!openAddModal) {
      form.resetFields();

      setProfilePic(null);
      setEmailNotifications(false);
      setEmailInvoice(false);
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
    formData.append("email_notifications", emailNotifications);
    formData.append("email_invoice", emailInvoice);

    // if (selectedFile) {
    //   formData.append("profile_image", selectedFile);
    // }
    if (profilePic instanceof File) {
      formData.append("profile_image", profilePic);
    }
    setLoading(true);

    try {
      const response = await updateClient({
        data: formData,
        userId: selectClientManagement.key,
        authId: selectClientManagement.authId,
      }).unwrap();
      message.success(response?.message);
      setOpenAddModal(false);
    } catch (error) {
      message.error(error?.data?.message);
      console.error("Error editing client:", error);
    }
    setLoading(false);
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
        <h2 className="text-center font-bold text-lg mb-11">Edit Client</h2>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* <div className="relative w-[140px] h-[140px] mx-auto mb-6">
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
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : profileImage
                  ? `${imageUrl}/${profileImage}`
                  : "default-placeholder.png"
              }
              alt="Client Profile"
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-6 right-6 bg-[#2A216D] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-300 shadow-sm text-xl"
            >
              <IoCameraOutline className="text-white" />
            </label>
          </div> */}

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
            label="Company/Client Name"
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

          <Form.Item label="Allow">
            <div className="flex flex-col gap-3">
              <Checkbox
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              >
                Email Notifications
              </Checkbox>
              <Checkbox
                checked={emailInvoice}
                onChange={(e) => setEmailInvoice(e.target.checked)}
              >
                Email Invoices
              </Checkbox>
            </div>
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
              disabled={loading}
            >
              {loading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

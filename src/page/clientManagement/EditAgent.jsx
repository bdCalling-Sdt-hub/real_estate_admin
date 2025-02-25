import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { imageUrl } from "../redux/api/baseApi";
import { useUpdateAgentManagementMutation } from "../redux/api/clientManageApi";

export const EditAgent = ({
  openAddModal,
  setOpenAddModal,
  selectAgentManagement,
}) => {
  const [form] = Form.useForm();
const [updateAgent] = useUpdateAgentManagementMutation();
const [selectedFile, setSelectedFile] = useState(null);
console.log(selectAgentManagement?.authId)
  const [profileImage, setProfileImage] = useState(null);
  
  
  useEffect(() => {
    if (selectAgentManagement) {
      // Populate the form fields
      form.setFieldsValue({
        name: selectAgentManagement.name,
        email: selectAgentManagement.email,
        address: selectAgentManagement.address,
        phone: selectAgentManagement.phone,
      });
      setProfileImage(selectAgentManagement.profile_image);
    }
  }, [selectAgentManagement, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  

  const handleSubmit = async (values) => {

    console.log("Submitted form:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone);
    formData.append("address", values.address);
    

    // Append the file only if one is selected
    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    try {
      const response = await updateAgent({
        data: formData,
        userId: selectAgentManagement.key,
        authId: selectAgentManagement.authId,
      }).unwrap();
      message.success(response?.message)
      console.log(response);
      setOpenAddModal(false);
    } catch (error) {
      message.error(error?.data?.message)
      console.error("Error editing client:", error);
    }


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
        <h2 className="text-center font-bold text-lg mb-11">Edit Agent</h2>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Image Upload / Preview */}
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

          {/* Agent Name */}
          <Form.Item
            label="Agent Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Buttons */}
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

import React, { useState } from "react";
import { Form, Input, Checkbox, Modal } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { useAddAgentManagementMutation } from "../redux/api/clientManageApi";

export const AddAgentModal = ({ openAddModal, setOpenAddModal, singleClientAgentData,id }) => {
  console.log(id)
  
  const client = singleClientAgentData?.data?.map((agent) => ({
    id: agent?.clientId, 
  })) || [];
  console.log(singleClientAgentData)

  console.log(client.length > 0 ? client[0].id : ''); 

  const [addAgent] = useAddAgentManagementMutation();
  const [passError, setPassError] = useState("");
  const [image, setImage] = useState(null);  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);  
  };

  const handleSubmit = async (values) => {
    console.log(values)
    const formData = new FormData();
    // Append the form data
    const clientId = client.length > 0 ? client[0].id : '';
    console.log(id)
    formData.append("name", values.name);
    formData.append("clientId", id);
    
    formData.append("email", values.email);
    formData.append("phone_number", values.phone);
    formData.append("address", values.address);
    formData.append("password", values.newPassword);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("role", "AGENT"); 

 
    if (image) {
      formData.append("profile_image", image);  
    }

    try {
      const response = await addAgent( formData ).unwrap(); 
      console.log(response); 
      setOpenAddModal(false); 
    } catch (error) {
      console.error("Error adding agent:", error);

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
        <h2 className="text-center font-bold text-lg mb-11">Add Agent</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
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
              src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/140"}
              alt="Agent Profile"
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-6 right-6 bg-[#2A216D] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-300 shadow-sm text-xl"
            >
              <IoCameraOutline className="text-white" />
            </label>
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
            <Input className="py-3" placeholder="Input here" />
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
            rules={[{ required: true, message: "Please enter the phone number" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter your new password" }]}
          >
            <Input.Password className="py-2" placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password className="py-2" placeholder="Confirm new password" />
          </Form.Item>
          {/* <Form.Item label="Give Access To">
                                <div className="flex flex-col gap-3">
                                <Checkbox> Place an orders </Checkbox>                        
                                <Checkbox> Can see the pricing </Checkbox>
                                <Checkbox> Can see only their order assigned to</Checkbox>
                                <Checkbox> Can see all orders </Checkbox>
                                <Checkbox> Can add new agents </Checkbox>
                                <Checkbox> Can see invoicing</Checkbox>
                                </div>
                              </Form.Item> */}

          {passError && <p className="text-red-600 -mt-4 mb-2">{passError}</p>}

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
              Add
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

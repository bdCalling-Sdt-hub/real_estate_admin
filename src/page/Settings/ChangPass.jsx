import React from "react";
import { Form, Input, Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ChangPass = () => {
  const handleFinish = (values) => {
    console.log("Form Values:", values);
  };

  const navigate = useNavigate()
  return (
    <div className="p-4 h-screen">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
        <button className="text-[#EF4849]">
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Change Password</span>
      </h1>
        <div className="max-w-[500px] m-auto py-11">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6 text-center mt-11">Change Password</h1>

      {/* Password Form */}
      <div className="flex justify-center">
      <Form
        layout="vertical"
        className="w-full max-w-sm"
        onFinish={handleFinish}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: "Please enter your current password" }]}
        >
          <Input.Password className="py-2" placeholder="Enter current password" />
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2 bg-[#2A216D] transition duration-300"
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
    </div>
  );
};

export default ChangPass;

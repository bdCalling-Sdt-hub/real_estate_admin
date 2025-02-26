import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

export const ContactCreate = ({ modal2Open, setModal2Open }) => {
  const handleFinish = async (values) => {
   
  };

  return (
    <Modal
      title="New Contact"
      centered
      open={modal2Open}
      onCancel={() => setModal2Open(false)}
      bodyStyle={{
        maxHeight: "50vh",
        overflowY: "auto",
      }}
      footer={[
        <Button key="cancel" onClick={() => setModal2Open(false)}>
          Cancel
        </Button>,
        <Button className="bg-[#2A216D]" key="save" type="primary" form="contactForm" htmlType="submit">
          Save
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        id="contactForm"
        onFinish={handleFinish}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input className="py-2" placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input className="py-2" placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input className="py-2" placeholder="Enter Email" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: "Phone Number is required" }]}
        >
          <Input className="py-2" addonBefore={<Select defaultValue="US">
              <Select.Option value="US">🇺🇸</Select.Option>
              {/* Add more country codes as needed */}
            </Select>} 
            placeholder="Enter Phone Number" />
        </Form.Item>

        <Form.Item name="company" label="Company">
          <Input className="py-2" placeholder="Enter Company" />
        </Form.Item>

        <Form.Item name="jobTitle" label="Job Title">
          <Input placeholder="Enter Job Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

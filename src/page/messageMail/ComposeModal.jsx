import React from "react";
import { Modal, Form, Input, Button } from "antd";

export const ComposeModal = ({ modal2Open1, setModal2Open1 }) => {
  const handleFinish = async (values) => {
    console.log(values);
  };

  return (
    <Modal
      title="New Message"
      centered
      open={modal2Open1}
      onCancel={() => setModal2Open1(false)}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
      }}
      footer={[
        <Button key="discard" onClick={() => setModal2Open1(false)}>
          Discard
        </Button>,
        <Button key="send" type="primary" form="emailForm" htmlType="submit">
          Send Mail
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        id="emailForm"
        onFinish={handleFinish}
      >
        <Form.Item
          name="to"
          label="To"
          rules={[{ required: true, message: "Recipient is required" }]}
        >
          <Input placeholder="Enter recipient email" />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Subject is required" }]}
        >
          <Input placeholder="Enter subject" />
        </Form.Item>

        <Form.Item
          name="body"
          label=""
          rules={[{ required: true, message: "Message body is required" }]}
        >
          <Input.TextArea
            rows={10}
            placeholder="Type your message here..."
            style={{ resize: "none" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

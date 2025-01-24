import React from 'react'
import { Modal, Form, Input, Button } from "antd";
export const RejectTask = ({ modal2Open1, setModal2Open1 }) => {
    const handleFinish = async (values) => {
        console.log(values);
      };
    
  return (
    <Modal
      title="Reject Production Task"
      centered
      open={modal2Open1}
      onCancel={() => setModal2Open1(false)}
      bodyStyle={{
        maxHeight: "40vh",
        overflowY: "auto",
      }}
      footer={[
        <Button key="discard" onClick={() => setModal2Open1(false)}>
         Cancel
        </Button>,
        <Button className='bg-[#2A216D]' key="send" type="primary" form="emailForm" htmlType="submit">
          Reject
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        id="emailForm"
        onFinish={handleFinish}
      >
        <Form.Item
          name="member"
          label="Select Team Member"
          rules={[{ required: true, message: "Recipient is required" }]}
        >
          <Input placeholder="Search..." />
        </Form.Item>

       

        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: "Message body is required" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Type your message here..."
            style={{ resize: "none" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

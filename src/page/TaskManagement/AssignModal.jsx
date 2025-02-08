import React from 'react'
import { Modal, Form, Input, Button, Select } from "antd";
export const AssignModal = ({setModal2Open,modal2Open}) => {
    const handleFinish = async (values) => {
        console.log(values);
      };
    
  return (
    <Modal
      title="Assign Team Member"
      centered
      open={modal2Open}
      onCancel={() => setModal2Open(false)}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
      }}
      footer={[
        <Button key="discard" onClick={() => setModal2Open(false)}>
          Cancel
        </Button>,
        <Button className='bg-[#2A216D]' key="send" type="primary" form="emailForm" htmlType="submit">
          Add
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
  label="Team Member"
  rules={[{ required: true, message: "Recipient is required" }]}
>
  <Select placeholder="Select a team member">
    <Select.Option value="member1">John Doe</Select.Option>
    <Select.Option value="member2">Jane Smith</Select.Option>
    <Select.Option value="member3">Sophie Ramirez</Select.Option>
    {/* Add more team members here */}
  </Select>
</Form.Item>


        
      </Form>
    </Modal>
  )
}

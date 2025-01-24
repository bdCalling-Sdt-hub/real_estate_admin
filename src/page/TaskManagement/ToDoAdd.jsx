import React from 'react';
import { Modal, Form, Input, Select, Button } from "antd";

export const ToDoAdd = ({ modal2Open3, setModal2Open3 }) => {
    const handleFinish = async (values) => {
        console.log(values);
    };

    return (
        <Modal
            title="Add to Do"
            centered
            open={modal2Open3}
            onCancel={() => setModal2Open3(false)}
            bodyStyle={{
                maxHeight: "70vh",
                overflowY: "auto",
            }}
            footer={[
                <Button key="cancel" onClick={() => setModal2Open3(false)}>
                    Cancel
                </Button>,
                <Button className='bg-[#2A216D]' key="save" type="primary" form="todoForm" htmlType="submit">
                    Save
                </Button>,
            ]}
        >
            <Form
                layout="vertical"
                id="todoForm"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="teamMember"
                    label="Select Team Member"
                    rules={[{ required: true, message: "Please select a team member" }]}
                >
                    <Input placeholder="Search" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please provide a description" }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Input here"
                        style={{ resize: "none" }}
                    />
                </Form.Item>

                <Form.Item
                    name="order"
                    label="Select Order (Not Required)"
                >
                    <Select placeholder="Select">
                        <Select.Option value="order1">Order 1</Select.Option>
                        <Select.Option value="order2">Order 2</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dueDate"
                    label="Select Due Date (Or as soon as possible)"
                >
                    <Select placeholder="Select">
                        <Select.Option value="asap">As soon as possible</Select.Option>
                        <Select.Option value="date1">Date 1</Select.Option>
                        <Select.Option value="date2">Date 2</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ToDoAdd;

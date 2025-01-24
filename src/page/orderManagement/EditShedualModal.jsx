import React from "react";
import { Modal, Form, Input, Select, Button, DatePicker, TimePicker } from "antd";

const { Option } = Select;

export const EditShedualModal = ({ modal2Open, setModal2Open }) => {
  const handleFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Modal
      title="Edit Schedule"
      centered
      open={modal2Open}
      onCancel={() => setModal2Open(false)}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleFinish}>
        {/* Time Zone Selection */}
        <Form.Item
          name="timeZone"
          label="Time Zone"
          rules={[{ required: true, message: "Time Zone is required" }]}
        >
          <Select placeholder="Select Time Zone">
            <Option value="America/New_York">America/New_York</Option>
            <Option value="Europe/London">Europe/London</Option>
            <Option value="Asia/Dhaka">Asia/Dhaka</Option>
          </Select>
        </Form.Item>

        {/* Calendar Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Jan 2025</h3>
          <div className="grid grid-cols-7 gap-2 mt-4 text-center">
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={`py-2 px-3 rounded-lg border cursor-pointer ${
                  i === 25
                    ? "bg-[#2A216D] text-white"
                    : "hover:border-purple-500 text-gray-700"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <Form.Item
          name="selectTime"
          label="Select Time:"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker use12Hours format="h:mm A" />
        </Form.Item>

        {/* Team Member Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Team Member</h3>
          <div className="flex items-center gap-2">
            <Input placeholder="Search Team Member" />
            <Button className="bg-[#2A216D]" type="primary">Add</Button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span>John Smith</span>
              <Button type="link" className="text-red-500">
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="px-6 py-2 rounded-lg bg-[#2A216D] text-white hover:bg-purple-800">
            Confirm Reschedule
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

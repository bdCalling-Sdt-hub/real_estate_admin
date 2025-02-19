import { Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

export const DetailsNote = ({ notes }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const onFinish = async (values) => {
    console.log(values);
  };
  console.log(notes);
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <div className="flex">
          <h3 className="text-lg font-semibold">Notes</h3>
          <p className="text-sm text-gray-400 italic mt-[6px] ml-3">
            (These notes are internal and not visible to the client)
          </p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="mt-2 text-yellow-500 hover:underline"
        >
          + Add Note
        </button>
      </div>
      {notes?.map((note) => (
        <div className="mt-2 bg-gray-100 p-4 rounded-md">
          <p className="text-gray-600">
            <strong>{note?.memberId?.name}</strong>{" "}
            <span className="text-gray-400 text-sm">
              {dayjs(note?.date).format("DD/MM/YYYY hh:mm A")}
            </span>
          </p>
          <p className="mt-2 text-gray-600">{note?.text}</p>
        </div>
      ))}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={null}
        width={600}
      >
        <div className="">
          <h2 className="text-center font-bold mb-8">+ Add Note</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <Input.TextArea rows={7} placeholder="Enter description" />
            </Form.Item>
            <div className="flex justify-center">
              <button className="bg-[#2A216D] py-2 px-6 rounded text-white">
                Add
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

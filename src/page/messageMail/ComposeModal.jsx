import { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useGetAllEmailsQuery } from "../redux/api/messageApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

export const ComposeModal = ({ composeModalOpen, setComposeModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: emails } = useGetAllEmailsQuery({ searchTerm });
  const [content, setContent] = useState("");

  const emailOptions = emails?.data?.map((e) => ({
    label: e.email,
    value: e._id,
  }));

  const handleFinish = async (values) => {
    console.log({ values });
  };

  const quillConfig = {
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
    ],
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
      ],
    },
  };
  return (
    <Modal
      title="New Message"
      centered
      open={composeModalOpen}
      onCancel={() => setComposeModalOpen(false)}
      footer={[
        <Button key="discard" onClick={() => setComposeModalOpen(false)}>
          Discard
        </Button>,
        <Button
          className="bg-[#2A216D]"
          key="send"
          type="primary"
          form="emailForm"
          htmlType="submit"
        >
          Send Mail
        </Button>,
      ]}
    >
      <Form layout="vertical" id="emailForm" onFinish={handleFinish}>
        <Form.Item
          name="to"
          label="To"
          rules={[{ required: true, message: "Recipient is required" }]}
        >
          <Select
            showSearch
            placeholder="Enter recipient email"
            onSearch={(val) => setSearchTerm(val)}
            options={emailOptions}
            optionFilterProp="label"
          />
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
          <ReactQuill
            className="mt-6 custom-quill bg-white"
            value={content}
            onChange={setContent}
            placeholder="Write your email..."
            formats={quillConfig.formats}
            modules={quillConfig.modules}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

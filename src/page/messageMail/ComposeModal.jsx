import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useGetAllEmailsQuery } from "../redux/api/messageApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import parseJWT from "../../utils/parseJWT";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const ComposeModal = ({ composeModalOpen, setComposeModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: emails } = useGetAllEmailsQuery({ searchTerm });
  const [content, setContent] = useState("");

  const emailOptions = emails?.data?.map((e) => ({
    label: e.email,
    value: e._id,
  }));

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

  const token = useSelector((state) => state.logInUser.token);
  const { authId } = parseJWT(token);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}?id=${authId}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleFinish = async ({ body, subject, to }) => {
    const payload = {
      receiverId: to,
      text: body,
      subject,
      email: emailOptions.find((e) => e.value === to).label,
    };

    socket.emit("new-email-message", payload);
    setComposeModalOpen(false);
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

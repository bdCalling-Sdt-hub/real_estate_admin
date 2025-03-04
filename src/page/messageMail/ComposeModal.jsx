import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { useGetAllEmailsQuery } from "../redux/api/messageApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import parseJWT from "../../utils/parseJWT";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const ComposeModal = ({ composeModalOpen, setComposeModalOpen }) => {
  const { data: emails } = useGetAllEmailsQuery({ searchTerm: "" });
  const [content, setContent] = useState("");

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
  const { authId, role } = parseJWT(token);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      `${import.meta.env.VITE_API_URL}?id=${authId}&role=${role}`
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleFinish = async ({ body, subject, to }) => {
    const receiverId = emails?.data?.find((email) => email.email === to)?._id;

    if (!receiverId) {
      message.error("Recipient email not found");
      return;
    }

    const payload = {
      receiverId,
      text: body,
      subject,
      email: to,
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

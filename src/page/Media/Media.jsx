import { Button, Form, Input, Modal, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

const Media = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const navigate = useNavigate();
  return (
    <main className="bg-white p-4">
      <div className="flex justify-between">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Media Settings</span>
        </h1>
        <Button
          onClick={() => setUploadModal(true)}
          icon={<Plus />}
          type="primary"
          className="bg-[#2A216D] text-white rounded focus:ring-2 focus:ring-gray-500"
        >
          Upload
        </Button>
      </div>
      <Table />
      <UploadModal open={uploadModal} setOpen={setUploadModal} />
    </main>
  );
};

export default Media;

const UploadModal = ({ open, setOpen }) => {
  const props = {
    name: "file",
    customRequest: ({ onSuccess }) => onSuccess("ok"),
  };

  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      open={open}
      title="Add new media"
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="url"
          label="Media target URL"
          rules={[
            {
              required: true,
              message: "Media target URL is required",
            },
            {
              type: "url",
              message: "Invalid URL",
            },
          ]}
        >
          <Input className="py-3" placeholder="Input here" />
        </Form.Item>
        <Form.Item
          name="file"
          label="Media file"
          rules={[{ required: true, message: "Media file is required" }]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item label={null}>
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="mr-2"
              type="default"
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-[#2A216D] text-white rounded focus:ring-2 focus:ring-gray-500"
            >
              Upload
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

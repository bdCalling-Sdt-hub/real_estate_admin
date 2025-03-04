import { Button, Card, Form, Input, Modal, Spin, Upload, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import {
  useCreateMediaMutation,
  useDeleteMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
} from "../redux/api/mediaApi";
import { UploadOutlined } from "@ant-design/icons";
import DeleteModal from "../messageMail/DeleteModal";

const Media = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const navigate = useNavigate();
  const { data, refetch, isLoading } = useGetMediaQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin />
      </div>
    );
  }
  return (
    <main className="bg-white p-4">
      <div className="flex justify-between">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Media Settings</span>
        </h1>
        {!data?.data?.image && (
          <Button
            onClick={() => setUploadModal(true)}
            icon={<Plus />}
            type="primary"
            className="bg-[#2A216D] text-white rounded focus:ring-2 focus:ring-gray-500"
          >
            Upload
          </Button>
        )}
      </div>
      {data?.data?.image ? (
        <MediaUploader
          image={data?.data?.image}
          url={data?.data?.url}
          id={data?.data?._id}
          refetch={refetch}
        />
      ) : (
        <div className="flex justify-center items-center p-4">
          <Card className="w-96 p-4 shadow-lg rounded-xl bg-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500">No Image</p>
              </div>
              <p className="text-blue-400 font-medium break-words">
                No media uploaded
              </p>
            </div>
          </Card>
        </div>
      )}
      <UploadModal
        open={uploadModal}
        setOpen={setUploadModal}
        refetch={refetch}
      />
    </main>
  );
};

export default Media;

const UploadModal = ({ open, setOpen, refetch }) => {
  const props = {
    name: "file",
    customRequest: ({ onSuccess }) => onSuccess("ok"),
    accept: "image/*",
  };

  const [createMedia] = useCreateMediaMutation();

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("url", values.url);
    formData.append("image", values.file.file.originFileObj);

    try {
      await createMedia(formData);
      setOpen(false);
      message.success("Media uploaded successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to upload media");
    } finally {
      refetch();
    }
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
              Support for a single upload. Strictly prohibited from uploading
              company data or other banned files.
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

const MediaUploader = ({ id, image, url, refetch }) => {
  const [imagePreview, setImagePreview] = useState(
    `${import.meta.env.VITE_API_URL}/${image}`
  );
  const [imgUrl, setImgUrl] = useState(url);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateMedia] = useUpdateMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("url", values.url);
      formData.append("image", values.image.file.originFileObj);
      await updateMedia({ id, formData });
      setIsEditing(false);
      message.success("Media updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to update media");
    } finally {
      refetch();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMedia({ id });
      setDeleteModal(false);
      message.success("Media deleted successfully");
      setImagePreview(null);
      setImgUrl(null);
    } catch (error) {
      console.log(error);
      message.error("Failed to delete media");
    } finally {
      refetch();
    }
  };

  const props = {
    name: "file",
    customRequest: ({ onSuccess }) => onSuccess("ok"),
    accept: "image/*",
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        setImagePreview(URL.createObjectURL(info.file.originFileObj));
      }
    },
  };
  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-96 p-4 shadow-lg rounded-xl bg-white">
        <div className="flex flex-col items-center space-y-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-200 rounded-lg">
              <p className="text-gray-500">No Image</p>
            </div>
          )}

          {isEditing ? (
            <Form
              className="w-full flex flex-col items-center"
              layout="vertical"
              onFinish={handleFinish}
            >
              <Form.Item name="image" label="Media Image">
                <Upload {...props}>
                  <Button className="w-full" icon={<UploadOutlined />}>
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="url"
                label="Media Target URL"
                rules={[{ type: "url", message: "Invalid URL" }]}
                initialValue={imgUrl}
              >
                <Input type="url" placeholder="Enter URL here" />
              </Form.Item>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-[#2A216D] text-white rounded focus:ring-2 focus:ring-gray-500"
                >
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <p className="text-blue-400 font-medium break-words">{imgUrl}</p>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#2A216D] text-white rounded focus:ring-2 focus:ring-gray-500"
                >
                  Update Media
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => setDeleteModal(true)}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        handleDelete={handleDelete}
        text="Are you sure you want to delete this media?"
      />
    </div>
  );
};

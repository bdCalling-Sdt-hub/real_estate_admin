import { Form, Input, Modal, Upload, Button, message, Spin } from "antd";
import { useState } from "react";
import { useAddServicesMutation } from "../redux/api/serviceApi";

export const AddServices = ({ openAddModal, setOpenAddModal, selectedCategory, categoryId }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [addServices] = useAddServicesMutation();
  const [loading, setLoading] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("category", categoryId);
    formData.append("title", values?.title);
    formData.append("price", values?.price);
    formData.append("descriptions", values?.description);

    fileList.forEach((file) => {
      formData.append("service_image", file.originFileObj);
    });
    setLoading(true);
    try {
      const response = await addServices(formData);
      setOpenAddModal(false);

      if (response?.data?.success) {
        message.success(response?.data?.message);
        form.resetFields();
        setLoading(false);
      } else {
        message.error(response?.error?.data?.message);
      }

      setFileList([]);
      setLoading(false);
    } catch (error) {
      message.error(error?.error?.data?.message);
      console.error("Error submitting form:", error);
    }
  };

  // Reset form and file list on cancel or close
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel} // Use the handleCancel function for the cancel action
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Add Service</h2>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Category Field */}
          <p className="pb-2">Category</p>
          <h1 className="border py-2 rounded-md px-2 mb-6">{selectedCategory}</h1>

          {/* Package Name */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the package name" }]}
          >
            <Input className="py-2" placeholder="Input here" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="number" placeholder="Input here" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea placeholder="Input here" rows={4} />
          </Form.Item>

          {/* Photos */}
          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true} // Allow multiple files
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={handleCancel} // Cancel action
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <Spin size="small" /> // Show spin loader when loading
              ) : (
                "Add"
              )}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

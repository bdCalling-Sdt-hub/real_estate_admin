import { Form, Input, Modal, Upload, Button, message } from "antd";
import { useState } from "react";
import { useAddServicesMutation } from "../redux/api/serviceApi";

export const AddServices = ({ openAddModal, setOpenAddModal, selectedCategory, categoryId }) => {
  const [fileList, setFileList] = useState([]);
  const [addServices] = useAddServicesMutation(); // Add the mutation for submitting the data

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Track the files being uploade
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

  // Form submission handler
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("category", categoryId); 
    formData.append("title", values.title); 
    formData.append("price", values.price); 
    formData.append("descriptions", values.description); 

    // Add the images to the formData
    fileList.forEach((file) => {
      formData.append("service_image", file.originFileObj);
    });

    try {
      const response = await addServices(formData); 
      setOpenAddModal(false); 
      console.log('response----------',response)
      if (response?.data?.success) {
        message.success(response?.data?.message); 
      } else {
        message.error(response?.error?.data?.message);
      }
      
      setFileList([]); 
    } catch (error) {
      message.error(error?.error?.data?.message)
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Add Service</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
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
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
            >
              Add
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

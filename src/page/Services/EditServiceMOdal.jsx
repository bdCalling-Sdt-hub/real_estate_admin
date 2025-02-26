import { Form, Input, Modal, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useUpdateServiceMutation } from "../redux/api/serviceApi";

export const EditServiceMOdal = ({
  editModal,
  setEditModal,
  selectedCategory,
}) => {

  const [updateServices] = useUpdateServiceMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    const id = selectedCategory?.key;
 
    const data = { ...values };


    
    const existingImages = fileList
      .filter((file) => file.url) 
      .map((file) => file.url);

    const newImages = fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj);


    const formData = new FormData();
    formData.append("data", JSON.stringify({ ...data, service_image: existingImages }));console.log('data immmmm',data)
    newImages.forEach((file) => {
      formData.append("service_image", file);
    });
    
    for (let pair of formData.entries()) {
     
    }
  
    try {
      const res = await updateServices({ data: formData, id }).unwrap();
      
      message.success(res?.message);

   
      form.resetFields();
      
    
      setFileList((prevFileList) =>
        prevFileList.filter((file) => file.url)
      );

      setEditModal(false);
    } catch (error) {
      message.error(error?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        title: selectedCategory?.title,
        price: selectedCategory?.price,
        descriptions: selectedCategory?.description,
      });

      // Create a list of existing images based on selectedCategory data
      const images = selectedCategory?.serviceImage?.map((url, index) => ({
        uid: index.toString(),
        name: `image-${index}.png`,
        status: "done",
        url: url,
      }));

      setFileList(images || []); // Set the file list with existing images
    }
  }, [selectedCategory, form]);

  return (
    <Modal
      centered
      open={editModal}
      onCancel={() => setEditModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit Service</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
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
            name="descriptions"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea placeholder="Input here" rows={4} />
          </Form.Item>

          {/* Photos */}
          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              onRemove={handleRemove}
              beforeUpload={() => false}
              multiple
            >
              {fileList.length >= 4 ? null : (
                <div className="flex items-center gap-2">
                  <PlusOutlined />
                  <div>Add Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

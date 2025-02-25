import { Form, Input, Modal, Button, Upload, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useGetAllServicesSelectQuery } from "../redux/api/serviceApi";
import { useUpdatePackageMutation } from "../redux/api/packageApi";
import { PlusOutlined } from "@ant-design/icons";

export const EditPackageModal = ({
  editModal,
  setEditModal,
  selectedCategory,
}) => {
  console.log("Selected Category Data:", selectedCategory);

  const { data: servicesData, isLoading } = useGetAllServicesSelectQuery();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [updatePackage] = useUpdatePackageMutation();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory.name,
        price: selectedCategory.price.replace("$", ""),
        descriptions: selectedCategory.description,
        services: selectedCategory.services?.map((service) => service._id) || [],
      });

      setSelectedServices(
        selectedCategory.services?.map((service) => service._id) || []
      );

      setFileList(
        selectedCategory.images?.map((url, index) => ({
          uid: index,
          name: `image-${index}.png`,
          status: "done",
          url,
        })) || []
      );
    }
  }, [selectedCategory, form]);

  // Map services for dropdown (show all available services)
  const serviceOptions =
    servicesData?.data?.data?.map((service) => ({
      value: service._id,
      label: service.title,
    })) || [];
  const handleServiceChange = (value) => {
    console.log("Selected Service IDs:", value);
    setSelectedServices(value);
  };


  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };


  const onFinish = async (values) => {
    const id = selectedCategory?.key;
    console.log("Package ID:", id);

    const existingImages = fileList
      .filter((file) => file.url)
      .map((file) => file.url);

    const newImages = fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("descriptions", values.descriptions);
    selectedServices.forEach((id) => {
      formData.append("services", id);
    });

    // Append images
    existingImages.forEach((img) => formData.append("package_image", img));
    newImages.forEach((file) => {
      formData.append("package_image", file);
    });

    console.log("Final FormData:", [...formData.entries()]);

    try {
      const res = await updatePackage({ data: formData, id }).unwrap();
      console.log("API Response:", res);
      message.success(res?.message);

      form.resetFields();
      setFileList((prevFileList) => prevFileList.filter((file) => file.url));
      setEditModal(false);
    } catch (error) {
      message.error(error?.data?.message || "An error occurred.");
      console.error("API Error:", error);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={() => setEditModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit Package</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Package Name */}
          <Form.Item
            label="Package Name"
            name="name"
            rules={[{ required: true, message: "Please enter the package name" }]}
          >
            <Input className="py-2" placeholder="Enter package name" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="number" placeholder="Enter price" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="descriptions"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          {/* Add Services/Products */}
          <Form.Item
            name="services"
            label="Add Services/Products"
            rules={[{ required: true, message: "Please select at least one service" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select services"
              value={selectedServices} // Show preselected values
              onChange={handleServiceChange} // Capture selected service IDs
              options={serviceOptions} // Show all services
              loading={isLoading}
            />
          </Form.Item>

          {/* Photos */}
          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
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
            <Button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

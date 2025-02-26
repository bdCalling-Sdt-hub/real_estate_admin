import { Form, Input, Modal, Button, Upload, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useAddPackageMutation } from "../redux/api/packageApi";
import { useGetAllServicesSelectQuery } from "../redux/api/serviceApi";

export const AddPackageModal = ({ openAddModal, setOpenAddModal }) => {
  const [addPackage] = useAddPackageMutation();
  const [fileList, setFileList] = useState([]);
  const { data: servicesData, isLoading } = useGetAllServicesSelectQuery();
 
  const [form] = Form.useForm();
  const [selectedServiceIds, setSelectedServiceIds] = useState();

  useEffect(() => {
   
  }, [servicesData]);
  const serviceOptions =
    servicesData?.data?.data?.map((service) => ({
      value: service?._id,
      label: service?.title,
    })) || [];
  const handleServiceChange = (value) => {
   
    setSelectedServiceIds(value);
  };
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("descriptions", values.descriptions);

    selectedServiceIds.forEach((id) => {
      formData.append("services", id);
   
    });

    fileList.forEach((file) => {
      formData.append("package_image", file.originFileObj);
    });

    try {
      const response = await addPackage(formData);
      

      if (response?.data?.success) {
        message.success(response?.data?.message);
        form.resetFields();
        setFileList([]);
        setSelectedServiceIds([]);
        setOpenAddModal(false);
      } else {
        message.error(response?.error?.data?.message || "Failed to add package");
      }
    } catch (error) {
      message.error("Error submitting form");
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
        <h2 className="text-center font-bold text-lg mb-11">New Package</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
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

          {/* Services Selection */}
          <Form.Item
            name="services"
            label="Add Services/Products"
            rules={[{ required: true, message: "Please select at least one service" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select services"
              onChange={handleServiceChange} // Capture selected service IDs
              options={serviceOptions}
              loading={isLoading}
            />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Package Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              multiple={true}
              beforeUpload={() => false} // Prevent auto-upload
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </Button>
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

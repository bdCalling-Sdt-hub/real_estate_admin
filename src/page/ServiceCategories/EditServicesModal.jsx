import { Form, Input, Modal, message } from "antd";
import { useState, useEffect } from "react";
import { useUpdateServiceCategoryMutation } from "../redux/api/serviceApi";

export const EditServicesModal = ({ openAddModal, setOpenAddModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [updateServiceCategory, { isLoading }] = useUpdateServiceCategoryMutation();


  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({ categoryName: selectedCategory?.categoryName });
    }
  }, [selectedCategory, form]);

  const handleSubmit = async (values) => {
    try {
      const response = await updateServiceCategory({
        id: selectedCategory.key,
        data: { name: values.categoryName }, // ✅ Fix
      }).unwrap();
      
      message.success(response.message );
      form.resetFields();
      setOpenAddModal(false);
    } catch (error) {
      message.error(error?.data?.message );
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
        <h2 className="text-center font-bold text-lg mb-11">Edit Category</h2>
        
        {/* 🔹 **Form with Default Values** */}
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{ required: true, message: "Please enter the category name" }]}
          >
            <Input className="py-2" placeholder="Input here" />
          </Form.Item>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-3 w-full border text-[#2A216D] rounded-md"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

import React, { useState } from "react";
import { Form, Input, Checkbox, Modal, Select, message, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { useAddTeamMemberMutation } from "../redux/api/clientManageApi";
import { useGetAllServicesSelectQuery } from "../redux/api/serviceApi";

export const AddTeamMember = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addTeamMember] = useAddTeamMemberMutation();
  const { data: getAllServicesSelect } = useGetAllServicesSelectQuery();

  const serviceOptions =
    getAllServicesSelect?.data?.data?.map((service) => ({
      label: service?.title,
      value: service?._id,
    })) || [];

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [access, setAccess] = useState({
    viewAssignedOrders: false,
    viewAllOrders: false,
    placeOrder: false,
    // productionWork: false,
    seePricing: false,
    editOrders: false,
    isAdmin: false,
    can_manage_teammembers: false,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };
  const handleAdminChange = (e) => {
    const isChecked = e.target.checked;
    setAccess({
      viewAssignedOrders: isChecked ? true : access.viewAssignedOrders,
      viewAllOrders: isChecked ? true : access.viewAllOrders,
      placeOrder: isChecked ? true : access.placeOrder,
      // productionWork: isChecked ? true : access.productionWork,
      seePricing: isChecked ? true : access.seePricing,
      editOrders: isChecked ? true : access.editOrders,
      can_manage_teammembers: isChecked ? true : access.can_manage_teammembers,
      isAdmin: isChecked,
    });
  };

  const handleCheckboxChange = (key) => (e) => {
    if (access.isAdmin) return;
    setAccess({ ...access, [key]: e.target.checked });
  };

  const handleServiceChange = (value) => {};

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      // Basic fields
      formData.append("name", values.member);
      formData.append("email", values.email);
      formData.append("password", values.newPassword);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("phone_number", values.phone);
      const finalRole = access.isAdmin ? "ADMIN" : "MEMBER";
      formData.append("role", finalRole);

      formData.append("roleOfName", values.roleOfName);

      formData.append(
        "view_assigned_order",
        access.viewAssignedOrders ? "true" : "false"
      );
      formData.append(
        "place_on_order_for_client",
        access.placeOrder ? "true" : "false"
      );
      // formData.append(
      //   "do_production_work",
      //   access.productionWork ? "true" : "false"
      // );
      formData.append("see_the_pricing", access.seePricing ? "true" : "false");
      formData.append("edit_order", access.editOrders ? "true" : "false");
      formData.append("can_manage_teammembers", access.can_manage_teammembers ? "true" : "false");
      formData.append("view_all_order", "true");
      formData.append("is_admin", access.isAdmin ? "true" : "false");
      if (values.services?.length) {
        values.services.forEach((serviceId) => {
          formData.append("serviceId", serviceId);
        });
      }
      setLoading(true);
      const response = await addTeamMember(formData);

      if (response?.error) {
        message.error(response.error.data.message);

        setLoading(false);
        console.error(response.error);
      } else {
        message.success(response?.data?.message);
        form.resetFields();
        setOpenAddModal(false);
      }
    } catch (error) {
      message.error(error?.data?.data?.message);
      console.error("Add Team Member Error:", error);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Add Team Member</h2>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          {/* Profile Image */}
          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imgUpload"
              style={{ display: "none" }}
            />
            <img
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #e5e7eb",
              }}
              src={imagePreview || "https://via.placeholder.com/140"}
              alt="Team Member Profile"
            />
            <label
              htmlFor="imgUpload"
              className="
                absolute bottom-6 right-6
                bg-[#2A216D]
                rounded-full
                w-8 h-8
                flex items-center justify-center
                cursor-pointer
                border border-gray-300 shadow-sm
                text-xl
              "
            >
              <IoCameraOutline className="text-white" />
            </label>
          </div>

          {/* Name */}
          <Form.Item
            label="Team Member Name"
            name="member"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Textual Role (roleName) */}
          <Form.Item
            label="Role"
            name="roleOfName"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                { value: "Photographer", label: "Photographer" },
                { value: "PhotoEditor", label: "Photo Editor" },
                { value: "VideoEditor", label: "Video Editor" },
                { value: "EnergyLabelAdvisor", label: "Energy Label Advisor" },
                { value: "Manager", label: "Manager" },
              ]}
              onChange={(value) => {}}
            />
          </Form.Item>

          {/* Services */}
          <Form.Item
            label="Services"
            name="services"
            rules={[
              { required: true, message: "Please select at least one service" },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Services"
              onChange={handleServiceChange}
              options={serviceOptions}
            />
          </Form.Item>

          {/* Passwords */}
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password className="py-2" placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              className="py-2"
              placeholder="Confirm new password"
            />
          </Form.Item>

          {/* Access Checkboxes */}
          <Form.Item label="Give Access To">
            <div className="flex flex-col gap-3">
              <Checkbox
                checked={access.viewAssignedOrders}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("viewAssignedOrders")}
              >
                Can view assigned orders
              </Checkbox>
              <Checkbox
                checked={access.can_manage_teammembers}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("can_manage_teammembers")}
              >
                Manage team members
              </Checkbox>
              <Checkbox
                checked={access.placeOrder}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("placeOrder")}
              >
                Can place an order for clients
              </Checkbox>
              {/* <Checkbox
                checked={access.productionWork}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("productionWork")}
              >
                Can do production work
              </Checkbox> */}
              <Checkbox
                checked={access.seePricing}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("seePricing")}
              >
                Can see the pricing
              </Checkbox>
              <Checkbox
                checked={access.editOrders}
                disabled={access.isAdmin}
                onChange={handleCheckboxChange("editOrders")}
              >
                Can edit orders
              </Checkbox>
              <Checkbox checked={access.isAdmin} onChange={handleAdminChange}>
                Is an admin
              </Checkbox>
            </div>
          </Form.Item>

          {/* Buttons */}
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

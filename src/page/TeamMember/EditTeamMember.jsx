import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Checkbox,
  Modal,
  Select,
  message,
  Avatar,
  Upload,
  Spin,
} from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { useUpdateTeamMemberMutation } from "../redux/api/clientManageApi";
import { useGetAllServicesSelectQuery } from "../redux/api/serviceApi";
import { imageUrl } from "../redux/api/baseApi";
import { FaCamera } from "react-icons/fa6";

export const EditTeamMember = ({
  openAddModal,
  setOpenAddModal,
  selectedTeamMember,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [image, setImage] = useState(null);
  const { data: getAllServicesSelect } = useGetAllServicesSelectQuery();
  const serviceOptions =
    getAllServicesSelect?.data?.data?.map((service) => ({
      label: service?.title,
      value: service?._id,
    })) || [];

  const [profileImage, setProfileImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // state for isAdmin checkbox
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    if (selectedTeamMember && openAddModal) {
      form.setFieldsValue({
        member: selectedTeamMember?.name,
        email: selectedTeamMember?.email,
        phone: selectedTeamMember?.phone,
        role: selectedTeamMember?.role,
        roleOfName: selectedTeamMember?.roleOfName,
        services:
          selectedTeamMember?.servicesId?.map((service) => service?._id) || [],
        viewAssignedOrders: selectedTeamMember?.view_assigned_order,
        can_manage_teammembers: selectedTeamMember?.can_manage_teammembers,
        viewAllOrders: selectedTeamMember?.view_all_order,
        placeOnOrderForClient: selectedTeamMember?.place_on_order_for_client,
        // doProductionWork: selectedTeamMember.do_production_work,
        seeThePricing: selectedTeamMember?.see_the_pricing,
        editOrders: selectedTeamMember?.edit_order,
        isAdmin: selectedTeamMember?.is_admin,
      });
      setSelectedServices(
        selectedTeamMember?.servicesId?.map((service) => service?._id) || []
      );
      setProfilePic(selectedTeamMember?.profile_image || null);
      setIsAdmin(selectedTeamMember?.is_admin); // set the isAdmin state
    }
  }, [selectedTeamMember, openAddModal]);

  useEffect(() => {
    if (!openAddModal) {
      form.resetFields();
      setSelectedFile(null);
      setSelectedServices([]);
      setProfileImage("");
      setIsAdmin(false);
    }
  }, [openAddModal]);

  const handleServiceChange = (value) => {
    setSelectedServices(value);
  };

  const handleImageChange = (e) => {
    if (e.file && e.file.originFileObj) {
      setProfilePic(e.file.originFileObj);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (profilePic instanceof File) {
        formData.append("profile_image", profilePic);
      }

      formData.append("name", values.member);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone);
      const finalRole = values.isAdmin ? "ADMIN" : "MEMBER";
      formData.append("role", finalRole);
      formData.append("roleOfName", values.roleOfName);

      selectedServices.forEach((id) => {
        formData.append("serviceId", id);
      });

      formData.append("view_assigned_order", values.viewAssignedOrders);
      formData.append("can_manage_teammembers", values.can_manage_teammembers);
      formData.append("view_all_order", true);
      formData.append(
        "place_on_order_for_client",
        values.placeOnOrderForClient
      );
      // formData.append("do_production_work", values.doProductionWork);
      formData.append("see_the_pricing", values.seeThePricing);
      formData.append("edit_order", values.editOrders);
      formData.append("is_admin", values.isAdmin);

      const memberId = selectedTeamMember?.key;
      const authId = selectedTeamMember?.authId;
      setLoading(true);
      const response = await updateTeamMember({
        data: formData,
        memberId,
        authId,
      });

      if (response?.error) {
        message.error(response.error.message || "Invalid Profile Image Type");
        console.error(response.error);
      } else {
        message.success(response?.data?.message);
        form.resetFields();
        setOpenAddModal(false);
      }
    } catch (error) {
      message.error(error?.data?.message);
      console.error("Update Team Member Error:", error);
    }
    setLoading(false);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked); // Toggle the isAdmin state
    if (!e.target.checked) {
      // If isAdmin is unchecked, reset all other checkboxes to false
      form.setFieldsValue({
        viewAssignedOrders: false,
        can_manage_teammembers: false,
        viewAllOrders: false,
        placeOnOrderForClient: false,
        // doProductionWork: false,
        seeThePricing: false,
        editOrders: false,
      });
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
        <h2 className="text-center font-bold text-lg mb-11">
          Edit Team Member
        </h2>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Profile Image */}
          {/* <div className="relative w-[140px] h-[140px] mx-auto mb-6">
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
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : profileImage
                  ? `${imageUrl}/${profileImage}`
                  : "default-placeholder.png"
              }
              alt="Team Member Profile"
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-6 right-6 bg-[#2A216D] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-300 shadow-sm text-xl"
            >
              <IoCameraOutline className="text-white" />
            </label>
          </div> */}

          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <Avatar
              size={140}
              src={
                profilePic
                  ? profilePic instanceof File
                    ? URL.createObjectURL(profilePic)
                    : `${imageUrl}/${profilePic}`
                  : null
              }
              className="border-4 border-highlight shadow-xl"
            />
            <Upload
              showUploadList={false}
              accept="image/*"
              maxCount={1}
              onChange={handleImageChange}
              className="absolute bottom-3 right-2 bg-[#0f0143] text-white px-1 rounded-full cursor-pointer"
            >
              <IoCameraOutline className="text-accent w-5 h-5 mt-1" />
            </Upload>
          </div>

          {/* Team Member Name */}
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
            <Input className="py-3" placeholder="Input here" disabled />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Role */}
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
              value={selectedServices}
              options={serviceOptions}
              onChange={handleServiceChange}
            />
          </Form.Item>

          {/* Access Checkboxes */}
          <Form.Item label="Give Access To">
            <div>
              <Form.Item name="viewAssignedOrders" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can view assigned orders</Checkbox>
              </Form.Item>
              <Form.Item name="can_manage_teammembers" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Manage team members</Checkbox>
              </Form.Item>
              <Form.Item name="placeOnOrderForClient" valuePropName="checked">
                <Checkbox disabled={isAdmin}>
                  Can place an order for clients
                </Checkbox>
              </Form.Item>
              {/* <Form.Item name="doProductionWork" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can do production work</Checkbox>
              </Form.Item> */}
              <Form.Item name="seeThePricing" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can see the pricing</Checkbox>
              </Form.Item>
              <Form.Item name="editOrders" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can edit orders</Checkbox>
              </Form.Item>
              <Form.Item name="isAdmin" valuePropName="checked">
                <Checkbox checked={isAdmin} onChange={handleIsAdminChange}>
                  Is an admin
                </Checkbox>
              </Form.Item>
            </div>
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
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#2A216D] text-white rounded-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <Spin size="small" /> // Show spin loader when loading
              ) : (
                "Update"
              )}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

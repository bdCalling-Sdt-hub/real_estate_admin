import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Modal, Select } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { useUpdateTeamMemberMutation } from "../redux/api/clientManageApi";
import { useGetAllServicesSelectQuery } from "../redux/api/serviceApi";
import { imageUrl } from "../redux/api/baseApi";

export const EditTeamMember = ({
  openAddModal,
  setOpenAddModal,
  selectedTeamMember,
}) => {
  const [form] = Form.useForm();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [image, setImage] = useState(null);
  const { data: getAllServicesSelect } = useGetAllServicesSelectQuery();
  const serviceOptions =
    getAllServicesSelect?.data?.data?.map((service) => ({
      label: service.title,
      value: service._id,
    })) || [];

  const [profileImage, setProfileImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // state for isAdmin checkbox

  useEffect(() => {
    if (selectedTeamMember) {
      form.setFieldsValue({
        member: selectedTeamMember.name,
        email: selectedTeamMember.email,
        phone: selectedTeamMember.phone,
        role: selectedTeamMember.role,
        roleOfName:selectedTeamMember.roleOfName,
        services: selectedTeamMember?.servicesId?.map((service) => service?._id) || [],
        viewAssignedOrders: selectedTeamMember.view_assigned_order,
        viewAllOrders: selectedTeamMember.view_all_order,
        placeOnOrderForClient: selectedTeamMember.place_on_order_for_client,
        doProductionWork: selectedTeamMember.do_production_work,
        seeThePricing: selectedTeamMember.see_the_pricing,
        editOrders: selectedTeamMember.edit_order,
        isAdmin: selectedTeamMember.is_admin,
      });
      setSelectedServices(
        selectedTeamMember.servicesId?.map((service) => service._id) || []
      );
      setProfileImage(selectedTeamMember.profile_image);
      setIsAdmin(selectedTeamMember.is_admin); // set the isAdmin state
    }
  }, [selectedTeamMember]);

  const handleServiceChange = (value) => {
    setSelectedServices(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
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
      formData.append("view_all_order", values.viewAllOrders);
      formData.append(
        "place_on_order_for_client",
        values.placeOnOrderForClient
      );
      formData.append("do_production_work", values.doProductionWork);
      formData.append("see_the_pricing", values.seeThePricing);
      formData.append("edit_order", values.editOrders);
      formData.append("is_admin", values.isAdmin);

      const memberId = selectedTeamMember?.key;
      const authId = selectedTeamMember?.authId;
      const response = await updateTeamMember({
        data: formData,
        memberId,
        authId,
      });
      if (response?.error) {
        console.error(response.error);
      } else {
        form.resetFields();
        setOpenAddModal(false);
      }
    } catch (error) {
      console.error("Update Team Member Error:", error);
    }
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked); // Toggle the isAdmin state
    if (!e.target.checked) {
      // If isAdmin is unchecked, reset all other checkboxes to false
      form.setFieldsValue({
        viewAssignedOrders: false,
        viewAllOrders: false,
        placeOnOrderForClient: false,
        doProductionWork: false,
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
          </div>

          {/* Team Member Name */}
          <Form.Item
            label="Team Member Name"
            name="member"
            rules={[{ required: true, message: "Please enter the name" }]}>
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}>
            <Input className="py-3" placeholder="Input here" disabled />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter the phone number" }]}>
            <Input className="py-3" placeholder="Input here" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            label="Role"
            name="roleOfName"
            rules={[{ required: true, message: "Please select a role" }]}>
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
            rules={[{ required: true, message: "Please select at least one service" }]}>
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
              <Form.Item name="viewAllOrders" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can view all orders</Checkbox>
              </Form.Item>
              <Form.Item name="placeOnOrderForClient" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can place an order for clients</Checkbox>
              </Form.Item>
              <Form.Item name="doProductionWork" valuePropName="checked">
                <Checkbox disabled={isAdmin}>Can do production work</Checkbox>
              </Form.Item>
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
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

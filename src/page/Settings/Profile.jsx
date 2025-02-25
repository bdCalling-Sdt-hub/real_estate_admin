import React, { useEffect, useState } from "react";
import logo from "../../assets/header/profileLogo.png";
import { FaArrowLeft } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [form] = Form.useForm();
  const [updateLoading, setUpdateLoading] = useState(false);
  const tab = "Profile";
  const{data:getProfile} = useGetProfileQuery();
  console.log(getProfile?.data?.profile_image)
  const [updateProfile] =useUpdateProfileMutation();
  useEffect(() => {
    if (getProfile?.data) {
      form.setFieldsValue({
        name: getProfile?.data?.name,
        email: getProfile?.data?.email,
        phone: getProfile?.data?.phone_number,
      });
    }
  }, [getProfile, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onEditProfile = (values) => {
    const data = new FormData();
    if (image) data.append("profile_image", image);
    data.append("name", values.name);
    data.append("phone_number", values.phone);
    updateProfile(data)
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully");
        // Redirect after success
      })
      .catch((error) => {
        message.error( error?.data?.message || "Failed To Update Profile");
      });
  };

  return (
    <div className="p-4 h-screen">
      <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
        <button className="text-[#EF4849]">
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">My Profile</span>
      </h1>
      <div className="max-w-[500px] m-auto py-11">
        <div className="">
          {/* Title */}
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Personal Details
          </h1>

          {/* Profile Picture Section */}
          <div className="mb-4 flex justify-center">
            <div className="relative w-[140px] h-[140px] mx-auto">
            <input
            type="file"
            onChange={handleImageChange}
            id="img"
            style={{ display: "none" }}
          />
          <img
            style={{ width: 140, height: 140, borderRadius: "100%" }}
            src={`${
              image
                ? URL.createObjectURL(image)
                : `${imageUrl}${getProfile?.data?.profile_image}`
            }`}
            alt="Admin Profile"
          />
              {tab === "Profile" && (
                <label
                  htmlFor="img"
                  className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  <IoCameraOutline className="text-black" />
                </label>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="mb-8 mt-16 space-y-4">
            <Form
              onFinish={onEditProfile}
              layout="vertical"
              form={form}
              
              initialValues={{
                name: getProfile?.name,
                email: getProfile?.email,
                phone: getProfile?.phone_number,
              }}
            >
              <Form.Item
                name="name"
                label={<p className="text-[16px] font-normal">User Name</p>}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<p className="text-[16px] font-normal">Email</p>}
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="Email"
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={<p className="text-[16px] font-normal">Contact No</p>}
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: "5px",
                    color: "#919191",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="+9900700007"
                />
              </Form.Item>
             

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={updateLoading}
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FCFCFC",
                    backgroundColor: "#2A216D",
                  }}
                  className="font-normal text-[16px] leading-6 rounded-full"
                >
                  Save & Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
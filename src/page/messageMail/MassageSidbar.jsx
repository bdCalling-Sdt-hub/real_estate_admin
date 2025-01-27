import React, { useState } from "react";
import { Button, Avatar, Modal, Form, Input } from "antd";
import {
  EditOutlined,
  MailOutlined,
  StarOutlined,
  PlusOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { MainMassage } from "./MainMassage";
import { FavouriteMassage } from "./FavouriteMassage";
import { TbMessageDots } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { ContactCreate } from "./ContactCreate";
import { UserDetailsPage } from "./UserDetailsPage";
import { ComposeModal } from "./ComposeModal";
export const MassageSidbar = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [modal2Open, setModal2Open] = useState(false);
  const [modal2Open2, setModal2Open2] = useState(false);
  const [modal2Open1, setModal2Open1] = useState(false);
  return (
    <div className="flex gap-4">
      <div className="bg-white h-screen p-4 w-[20%]">
        {/* Compose Button */}
        <Button
          onClick={() => setModal2Open1(true)}
          type="primary"
          icon={<EditOutlined />}
          block
          style={{
            backgroundColor: "#2A216D",
            borderColor: "#4A3AFF",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          Compose
        </Button>

        {/* Inbox and Favorite */}
        <div className="mb-8">
          <div
            onClick={() => setSelectedTab("all")}
            className={` py-2.5  cursor-pointer ${
              selectedTab === "all"
                ? "bg-[#EAE9F0] text-[#2A216D] rounded "
                : " "
            }`}
          >
            <div className="flex justify-between px-5">
              <span className="flex gap-2">
                <TbMessageDots className="text-2xl" />
                Message
              </span>
              <span>120</span>
            </div>
          </div>
          <div
            onClick={() => setSelectedTab("submitted")}
            className={` py-2.5 mt-3 cursor-pointer ${
              selectedTab === "submitted"
                ? "bg-[#EAE9F0] text-[#2A216D] rounded"
                : " "
            }`}
          >
            <div className="flex justify-between px-5 ">
              <span className="flex gap-2">
                <FaRegStar className="text-2xl" />
                Favorite
              </span>
              <span>230</span>
            </div>
          </div>
        </div>

        {/* Contracts Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">Contacts</span>
            <PlusOutlined
              onClick={() => setModal2Open(true)}
              style={{ fontSize: "16px", color: "" }}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/40"
                size={40}
                className="mr-4"
              />
              <span
                onClick={() => setModal2Open2(true)}
                className="text-gray-700 cursor-pointer"
              >
                Dianne Russell
              </span>
            </div>
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/40"
                size={40}
                className="mr-4"
              />
              <span className="text-gray-700">Courtney Henry</span>
            </div>
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/40"
                size={40}
                className="mr-4"
              />
              <span className="text-gray-700">Savannah Nguyen</span>
            </div>
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/40"
                size={40}
                className="mr-4"
              />
              <span className="text-gray-700">Eleanor Pena</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%]">
        {selectedTab === "all" && (
          <div>
            <MainMassage></MainMassage>
          </div>
        )}
        {selectedTab === "submitted" && (
          <div>
            <FavouriteMassage></FavouriteMassage>
          </div>
        )}
      </div>
      <Modal
        centered
        open={modal2Open2}
        onCancel={() => setModal2Open2(false)}
        bodyStyle={{
          maxHeight: "50vh",
          overflowY: "auto",
        }}
        footer={[
          <Button key="cancel" onClick={() => setModal2Open2(false)}>
            Cancel
          </Button>,
          <Button
            className="bg-[#2A216D]"
            key="save"
            type="primary"
            form="contactForm"
            htmlType="submit"
          >
            Save
          </Button>,
        ]}
      >
        <div className="">
          {/* Avatar */}
          <div className="flex justify-between">
            <div>
            <Avatar
              size={64}
              src="https://via.placeholder.com/150" // Replace with the actual image URL
            />
            <h2 className="text-lg font-semibold mt-2">Diannel Russell</h2>
            </div>
            <button onClick={() => setModal2Open(true)}>Edit</button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Contact Details</h3>
          <div className="flex items-center gap-2 mb-3">
            <MailOutlined className="text-lg" />
            <span>diannelrussell24@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <PhoneOutlined className="text-lg" />
            <span>+8801834109489</span>
          </div>
          <div className="flex items-center gap-2">
            <HomeOutlined className="text-lg" />
            <span>Managing Director (Square Company Ltd.)</span>
          </div>
        </div>
      </Modal>

      <ContactCreate
        setModal2Open={setModal2Open}
        modal2Open={modal2Open}
      ></ContactCreate>
      <ComposeModal
        setModal2Open1={setModal2Open1}
        modal2Open1={modal2Open1}
      ></ComposeModal>
    </div>
  );
};

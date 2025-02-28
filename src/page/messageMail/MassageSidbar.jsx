import React, { useEffect, useState } from "react";
import { Button, Avatar, Modal, Popover } from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { MainMassage } from "./MainMassage";
import { TbMessageDots } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { ComposeModal } from "./ComposeModal";
import { useNavigate } from "react-router-dom";

export const MassageSidbar = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const navigate = useNavigate();

  const contacts = ["John", "Jane"];

  const handleSelectTab = (val) => {
    setSelectedTab(val);
    navigate(`/dashboard/message-mail`);
  };
  return (
    <div className="flex gap-4">
      <div className="bg-white h-[84vh] p-4 w-[20%]">
        <Button
          onClick={() => setComposeModalOpen(true)}
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

        <div className="mb-8">
          <div
            onClick={() => handleSelectTab("All")}
            className={` py-2.5  cursor-pointer ${
              selectedTab === "All"
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
            onClick={() => handleSelectTab("Favorite")}
            className={` py-2.5 mt-3 cursor-pointer ${
              selectedTab === "Favorite"
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

        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">Contacts</span>
          </div>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Popover content={ContactPopOver} className="flex items-center">
                <Avatar
                  src="https://via.placeholder.com/40"
                  size={40}
                  className="mr-4"
                />
                <span className="text-gray-700 cursor-pointer">{contact}</span>
              </Popover>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[80%]">
        <MainMassage tab={selectedTab} />
      </div>

      <ComposeModal
        setComposeModalOpen={setComposeModalOpen}
        composeModalOpen={composeModalOpen}
      />
    </div>
  );
};

const ContactPopOver = () => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <Avatar size={48} src="https://via.placeholder.com/150" />
          <h2 className="text-lg font-semibold mt-2">Diannel Russell</h2>
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
    </>
  );
};

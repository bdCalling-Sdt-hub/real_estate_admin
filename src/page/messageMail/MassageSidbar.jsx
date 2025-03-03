import React, { useEffect, useState } from "react";
import { Button, Avatar, Popover } from "antd";
import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { MainMassage } from "./MainMassage";
import { TbMessageDots } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { ComposeModal } from "./ComposeModal";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import parseJWT from "../../utils/parseJWT";
import { useGetFavoriteListQuery } from "../redux/api/messageApi";

export const MassageSidbar = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const { data: favContacts, refetch: refetchFavs } = useGetFavoriteListQuery();
  const [count, setCount] = useState(0);

  const handleSelectTab = (val) => {
    setSelectedTab(val);
    navigate(`/dashboard/message-mail`);
    refetchFavs();
  };

  const token = useSelector((state) => state.logInUser.token);
  const { authId, role } = parseJWT(token);

  useEffect(() => {
    const socket = io(
      `${import.meta.env.VITE_API_URL}?id=${authId}&role=${role}`
    );

    socket.emit("contact-list");

    socket.on("contact-list", (contacts) => {
      setContacts(contacts.map((contact) => contact.participants[0]));
    });

    socket.emit("conversion-list");

    socket.on("conversion-list", (message) => {
      setCount(message.length);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="bg-white md:h-[84vh] p-4 md:w-[20%] overflow-y-auto">
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
                All
              </span>
              <span>{count}</span>
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
              <span>{favContacts?.data?.length || 0}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">Contacts</span>
          </div>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Popover
                content={() => <ContactPopOver contact={contact} />}
                className="flex items-center"
              >
                <Avatar
                  src={
                    contact?.profile_image
                      ? `${import.meta.env.VITE_API_URL}${
                          contact?.profile_image
                        }`
                      : `https://ui-avatars.com/api/?name=${contact?.name}`
                  }
                  size={40}
                  className="mr-4"
                />
                <span className="text-gray-700 cursor-pointer">
                  {contact?.name}
                </span>
              </Popover>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-[80%]">
        <MainMassage
          tab={selectedTab}
          favContacts={favContacts}
          refetchFavs={refetchFavs}
        />
      </div>

      <ComposeModal
        setComposeModalOpen={setComposeModalOpen}
        composeModalOpen={composeModalOpen}
      />
    </div>
  );
};

const ContactPopOver = ({ contact }) => {
  return (
    <div className="px-2">
      <div>
        <div className="flex items-center gap-3">
          <Avatar
            size={48}
            src={
              contact?.profile_image
                ? `${import.meta.env.VITE_API_URL}${contact?.profile_image}`
                : `https://ui-avatars.com/api/?name=${contact?.name}`
            }
          />
          <h2 className="text-lg font-semibold mt-2">{contact?.name}</h2>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-medium mb-2">Contact Details</h3>
        <div className="flex items-center gap-2 mb-3">
          <MailOutlined className="text-lg" />
          <span>{contact?.email}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <PhoneOutlined className="text-lg" />
          <span>+{contact?.phone_number}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { ServicesTab } from "./ServicesTab";
import { AdressTab } from "./AdressTab";
import { ContactInforTab } from "./ContactInforTab";
import { ConfirmSection } from "./ConfirmDection";
import { FaArrowLeftLong, FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { CreateANewOrder } from "./CreateANewOrder";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../redux/api/ordersApi";
const CreateServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    serviceIds: [],
    services: [],
    contactAgent: "false",
    address: {
      lat: 52.3547418,
      lng: 4.8215606,
    },
  });

  const tabs = ["Services", "Address", "Contact Info", "Confirm"];
  const tabContent = [
    <CreateANewOrder
      key={0}
      formData={formData}
      setFormData={setFormData}
      setActiveTab={setActiveTab}
    />,
    <ServicesTab key={1} formData={formData} setFormData={setFormData} />,
    <AdressTab key={2} formData={formData} setFormData={setFormData} />,
    <ContactInforTab key={3} formData={formData} setFormData={setFormData} />,
    <ConfirmSection key={4} formData={formData} setFormData={setFormData} />,
  ];
  const handleNext = () => {
    // Step 1: Services Tab Validation
    if (activeTab === 1) {
      if (formData.serviceIds.length > 0) {
        setActiveTab(2);
      } else {
        message.error("Please select a service");
        return; // Stop further processing
      }
    }

    // Step 2: Address Tab Validation
    if (activeTab === 2) {
      const { zipCode, city, streetAddress, streetName, streetNumber } =
        formData.address || {};
      if (
        zipCode &&
        city &&
        streetAddress &&
        streetName &&
        streetNumber &&
        formData?.pickupKeys
      ) {
        setActiveTab(3);
      } else {
        message.error("Please enter an address");
        return;
      }
    }

    // Step 3: Contact Info Tab Validation
    if (activeTab === 3) {
     
      const contactAgent =
        formData?.contactAgent === "true" && formData?.linkedAgents?._id;
      const contactOwner =
        formData?.contactAgent === "false" &&
        formData?.contactInfo &&
        formData.contactInfo.name1 &&
        formData.contactInfo.email1 &&
        formData.contactInfo.phone1;
      if (contactAgent || contactOwner) {
        setActiveTab(4);
      } else {
        message.error("Please enter contact information");
        return; // Stop further processing
      }
    }

    // Step 4: Confirm Tab (Final Step Validation)
    if (activeTab === 4) {
      if (formData.services?.length > 0) {
        handleCreateOrder();
      } else {
        message.error("Please review your service information");
        return; // Stop further processing
      }
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleCreateOrder = () => {
    const formDataForAPI = new FormData();
    const serviceIds = formData.services
      .filter((service) => !service.package_image)
      .map((service) => service._id);
    const packageIds = formData.services
      .filter((service) => service.package_image)
      .map((service) => service._id);

    const data = {
      clientId: formData.client,
      pickupKeyOffice: formData.pickupKeys === "yes" ? true : false,
      contactAgent: formData.contactAgent,
      contactOwner: formData.contactAgent === "false" ? true : false,
      address: formData.address,
      contactInfo: formData.contactInfo,
      linkedAgents:
        formData.contactAgent === "true" ? [formData.linkedAgents._id] : [],
      locations: {
        lat: formData.address.lat,
        lng: formData.address.lng,
      },
      descriptions: formData.description,
      totalAmount: formData.services.reduce((acc, curr) => acc + curr.price, 0),
      serviceIds: serviceIds,
      packageIds: packageIds,
    };
    formData.uploadFiles.forEach((file) => {
      formDataForAPI.append("uploadFiles", file.originFileObj);
    });
    formDataForAPI.append("data", JSON.stringify(data));

    try {
      createOrder(formDataForAPI);
      message.success("Order created successfully");
      // Reset form data
      setFormData({
        serviceIds: [],
        services: [],
        contactAgent: "false",
      });

      navigate("/");
    } catch (error) {
      
      message.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white p-4">
      <div
        className="flex justify-center"
        style={{ display: activeTab === 0 ? "none" : "flex" }}
      >
        <TabHeader tabs={tabs} activeTab={activeTab} />
      </div>

      <div style={{ minHeight: "100px", marginBottom: "20px" }}>
        <h2>{tabContent[activeTab]}</h2>
      </div>

      <TabFooter
        activeTab={activeTab}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        tabs={tabs}
      />
    </div>
  );
};

export default CreateServices;

const TabHeader = ({ tabs, activeTab }) => (
  <div style={{ display: "flex", marginBottom: "20px" }}>
    {tabs.map((tab, index) => (
      <div className="flex" key={index}>
        <div
          style={{
            padding: "6px 20px",
            border:
              activeTab - 1 === index
                ? "1px solid #9B3C7B"
                : "1px dashed #9B3C7B",
            backgroundColor: activeTab - 1 === index ? "#F5ECF2" : "",
            color: "#9B3C7B",
            borderRadius: "50px",
            cursor: "default",
          }}
        >
          {index + 1}. {tab}
        </div>
        {index < tabs.length - 1 && (
          <span className="text-[#9B3C7B] mt-1">...............</span>
        )}
      </div>
    ))}
  </div>
);

const TabFooter = ({ activeTab, handleNext, handlePrevious, tabs }) => (
  <div className="flex justify-center mt-11">
    <div
      className="flex gap-5"
      style={{ display: activeTab === 0 ? "none" : "flex" }}
    >
      <button
        className="border border-[#2A216D] text-[#2A216D] flex items-center"
        onClick={handlePrevious}
        disabled={activeTab === 0}
        style={{
          padding: "7px 40px",
          cursor: activeTab === 0 ? "not-allowed" : "pointer",
        }}
      >
        <FaArrowLeftLong className="text-lg mr-2 mt-1" />
        Previous
      </button>
      <button
        className="border border-[#2A216D] text-[#2A216D] flex items-center"
        onClick={handleNext}
        disabled={activeTab === tabs.length + 1}
        style={{
          padding: "7px 40px",
          cursor: activeTab === tabs.length + 1 ? "not-allowed" : "pointer",
        }}
      >
        {activeTab === tabs.length ? (
          <>
            Confirm <FaCheck className="text-lg ml-2 mt-1" />
          </>
        ) : (
          <>
            Next <FaArrowRightLong className="text-lg ml-2 mt-1" />
          </>
        )}
      </button>
    </div>
  </div>
);

import React, { useState } from "react";
import { ServicesTab } from "./ServicesTab";
import { AdressTab } from "./AdressTab";
import { ContactInforTab } from "./ContactInforTab";
import { ConfirmSection } from "./ConfirmDection";
import { FaArrowLeftLong, FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { CreateANewOrder } from "./CreateANewOrder";
const CreateServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ serviceIds: [], services: [] });

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
    if (activeTab < tabs.length) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
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
        disabled={activeTab === tabs.length}
        style={{
          padding: "7px 40px",
          cursor: activeTab === tabs.length ? "not-allowed" : "pointer",
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

import React, { useEffect } from "react";
import { Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AllManage } from "./AllManage";
import { Submited } from "./Submited";
import { Scedualed } from "./Scedualed";
import { Production } from "./Production";
import { Delivered } from "./Delivered";
import { Revision } from "./Revision";
import { Complete } from "./Complete";

export const OrderManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected tab from URL
  const selectedTab = location.pathname.split("/").pop() || "all";

  // Function to change tab & update route
  const handleTabChange = (tab) => {
    navigate(`/dashboard/order-management/${tab}`);
  };

  return (
    <div className="h-screen">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-5">
          <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">Order Management</span>
          </h1>
          <Input placeholder="Search here..." style={{ width: 300 }} />
        </div>

        {/* Tabs */}
        <div className="border-b flex mb-5">
          {[
            { label: "All", key: "all", count: 400 },
            { label: "Submitted", key: "submitted", count: 120 },
            { label: "Scheduled", key: "scheduled" },
            { label: "In Production", key: "production", count: 45 },
            { label: "Delivered", key: "delivered", count: 47 },
            { label: "Revisions", key: "revisions", count: 21 },
            { label: "Completed", key: "completed" },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              style={{
                padding: "10px 20px",
                borderRadius: "5px 5px 0px 0px",
                cursor: "pointer",
                backgroundColor: selectedTab === tab.key ? "#F5ECF2" : "white",
                color: selectedTab === tab.key ? "#9B3C7B" : "black",
              }}
            >
              {tab.label} {tab.count && `(${tab.count})`}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ borderRadius: "8px" }}>
          {selectedTab === "all" && <AllManage />}
          {selectedTab === "submitted" && <Submited />}
          {selectedTab === "scheduled" && <Scedualed />}
          {selectedTab === "production" && <Production />}
          {selectedTab === "delivered" && <Delivered />}
          {selectedTab === "revisions" && <Revision />}
          {selectedTab === "completed" && <Complete />}
        </div>
      </div>
    </div>
  );
};

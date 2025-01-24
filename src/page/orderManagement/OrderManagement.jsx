import React, { useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AllManage } from "./AllManage";
import { Submited } from "./Submited";
import { Scedualed } from "./Scedualed";
import { Production } from "./Production";
import { Delivered } from "./Delivered";
import { Revision } from "./Revision";
import { Complete } from "./Complete";

export const OrderManagement = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="h-screen ">
      <div className="bg-white p-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            onClick={() => navigate(-1)}
            className="flex gap-4 cursor-pointer"
          >
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">Order Management</span>
          </h1>
          <Input placeholder="Search here..." style={{ width: 300 }} />
        </div>

        <div
          className="border-b"
          style={{ marginBottom: "20px", display: "flex" }}
        >
          <div
            onClick={() => setSelectedTab("all")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor: selectedTab === "all" ? "#F5ECF2" : "white",
              color: selectedTab === "all" ? "#9B3C7B" : "black",
            }}
          >
            All(400)
          </div>
          <div
            onClick={() => setSelectedTab("submitted")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "submitted" ? "#F5ECF2" : "white",
              color: selectedTab === "submitted" ? "#9B3C7B" : "black",
            }}
          >
            Submitted(120)
          </div>
          <div
            onClick={() => setSelectedTab("scheduled")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "scheduled" ? "#F5ECF2" : "white",
              color: selectedTab === "scheduled" ? "#9B3C7B" : "black",
            }}
          >
            Scheduled
          </div>
          <div
            onClick={() => setSelectedTab("production")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "production" ? "#F5ECF2" : "white",
              color: selectedTab === "production" ? "#9B3C7B" : "black",
            }}
          >
            In Production(45)
          </div>
          <div
            onClick={() => setSelectedTab("delivered")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "delivered" ? "#F5ECF2" : "white",
              color: selectedTab === "delivered" ? "#9B3C7B" : "black",
            }}
          >
            Delivered(47)
          </div>
          <div
            onClick={() => setSelectedTab("revisions")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "revisions" ? "#F5ECF2" : "white",
              color: selectedTab === "revisions" ? "#9B3C7B" : "black",
            }}
          >
            Revisions(21)
          </div>
          <div
            onClick={() => setSelectedTab("completed")}
            style={{
              padding: "10px 20px",
              borderRadius: "5px 5px 0px 0px",
              cursor: "pointer",
              backgroundColor:
                selectedTab === "completed" ? "#F5ECF2" : "white",
              color: selectedTab === "completed" ? "#9B3C7B" : "black",
            }}
          >
            Completed
          </div>
        </div>

        <div
          style={{
            borderRadius: "8px",
          }}
        >
          {selectedTab === "all" && (
            <div>
              <AllManage></AllManage>
            </div>
          )}
          {selectedTab === "submitted" && (
            <div>
              <Submited></Submited>
            </div>
          )}
          {selectedTab === "scheduled" && (
            <div>
              <Scedualed></Scedualed>
            </div>
          )}
          {selectedTab === "production" && (
            <div>
              <Production></Production>
            </div>
          )}
          {selectedTab === "delivered" && (
            <div>
              <Delivered></Delivered>
            </div>
          )}
          {selectedTab === "revisions" && (
            <div>
              <Revision></Revision>
            </div>
          )}
          {selectedTab === "completed" && (
            <div>
              <Complete></Complete>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { Input } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AllManage } from "./AllManage";
import { Progress } from "./Progress";
import { Complete } from "./Complete";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";
import { useGetOrderStatusQuery } from "../redux/api/dashboardApi";

export const OrderManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: count } = useGetOrderStatusQuery();
  // Get selected tab from URL
  const selectedTab = location.pathname.split("/").pop() || "all";

  // Function to change tab & update route
  const handleTabChange = (tab) => {
    navigate(`/dashboard/order-management/${tab}`);
  };

  const [search, setSearch] = useState("");
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Order Management</span>
        </h1>
        <Input
          placeholder="Search here..."
          style={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="border-b flex mb-5">
        {[
          { label: "All", key: "all", count: count?.data?.totalOrders },
          {
            label: "In Progress",
            key: "progress",
            count: count?.data?.pendingOrders,
          },
          {
            label: "Completed",
            key: "completed",
            count: count?.data?.completeOrders,
          },
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
      <div className="overflow-auto max-w-full">
        {selectedTab === "all" && <AllManage search={search} />}
        {selectedTab === "progress" && <Progress search={search} />}
        {selectedTab === "completed" && <Complete search={search} />}
      </div>
    </div>
  );
};

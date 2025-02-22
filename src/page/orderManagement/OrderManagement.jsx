import { Input } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AllManage } from "./AllManage";
import { Progress } from "./Progress";
import { Complete } from "./Complete";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";

export const OrderManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected tab from URL
  const selectedTab = location.pathname.split("/").pop() || "all";

  // Function to change tab & update route
  const handleTabChange = (tab) => {
    navigate(`/dashboard/order-management/${tab}`);
  };

  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: 1,
    limit: 10000,
  });

  const {
    All: allCount,
    InProgress: progressCount,
    Completed: completedCount,
  } = (!isLoading &&
    orders?.data?.data?.reduce(
      (acc, order) => {
        if (order.status === "In Progress") {
          acc.InProgress += 1;
        } else if (order.status === "Completed") {
          acc.Completed += 1;
        }
        return acc;
      },
      {
        All: orders?.data?.meta?.total || 0,
        InProgress: 0,
        Completed: 0,
      }
    )) ||
  {};

  const [search, setSearch] = useState("");
  return (
    <div className="h-screen">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-5">
          <h1
            onClick={() => navigate(-1)}
            className="flex gap-4 cursor-pointer"
          >
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
            { label: "All", key: "all", count: allCount },
            { label: "In Progress", key: "progress", count: progressCount },
            { label: "Completed", key: "completed", count: completedCount },
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
          {selectedTab === "all" && <AllManage search={search} />}
          {selectedTab === "progress" && <Progress search={search} />}
          {selectedTab === "completed" && <Complete search={search} />}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { ServicesPackeg } from "../createOrder/ServicesPackeg";
import { ServicesPhoto } from "../createOrder/ServicesPhoto";
import { ServicesVideos } from "../createOrder/ServicesVideos";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const AddServicePage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  return (
    <div className="bg-white p-4">
      <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
        <button className="text-[#EF4849]">
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Add Services</span>
      </h1>
      <div className="flex justify-between mt-7">
        <div className="flex gap-3">
          <div
            onClick={() => setSelectedTab("all")}
            className={`px-11 py-1  cursor-pointer ${
              selectedTab === "all"
                ? "bg-[#2A216D] text-[white] rounded-full "
                : "border border-[#2A216D] text-[#2A216D] rounded-full "
            }`}
          >
            Packages
          </div>
          <div
            onClick={() => setSelectedTab("submitted")}
            className={`px-11 py-1  cursor-pointer ${
              selectedTab === "submitted"
                ? "bg-[#2A216D] text-[white] rounded-full"
                : "border border-[#2A216D] text-[#2A216D] rounded-full "
            }`}
          >
            Photos
          </div>
          <div
            onClick={() => setSelectedTab("video")}
            className={`px-11 py-1  cursor-pointer ${
              selectedTab === "video"
                ? "bg-[#2A216D] text-[white] rounded-full"
                : "border border-[#2A216D] text-[#2A216D] rounded-full "
            }`}
          >
            Videos
          </div>
        </div>

        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      {selectedTab === "all" && (
        <div>
          <ServicesPackeg></ServicesPackeg>
        </div>
      )}
      {selectedTab === "submitted" && (
        <div>
          <ServicesPhoto></ServicesPhoto>
        </div>
      )}
      {selectedTab === "video" && (
        <div>
          <ServicesVideos></ServicesVideos>
        </div>
      )}
    </div>
  );
};

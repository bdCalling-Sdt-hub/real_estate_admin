import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import Profile from "./Profile";
import { ChangPass } from "./ChangPass";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsKey } from "react-icons/bs";
const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  return (
    <div className="flex gap-4">
      <div className="mb-8 w-[20%] bg-white">
        <div>
            <p className="text-xl font-semibold pt-5 px-5">Setting</p>
        </div>
        <div
          onClick={() => setSelectedTab("all")}
          className={` py-2.5 mt-6 mx-6  cursor-pointer ${
            selectedTab === "all" ? "bg-[#EAE9F0] text-[#2A216D] rounded " : " "
          }`}
        >
          <div className="flex justify-between px-5">
            <span className="flex gap-2">
              <HiOutlineUserCircle className="text-2xl" />
              My Profile
            </span>
            
          </div>
        </div>
        <div
          onClick={() => setSelectedTab("submitted")}
          className={` py-2.5 mt-3 mx-6 cursor-pointer ${
            selectedTab === "submitted"
              ? "bg-[#EAE9F0] text-[#2A216D] rounded"
              : " "
          }`}
        >
          <div className="flex justify-between px-5 ">
            <span className="flex gap-2">
              <BsKey className="text-2xl" />
              Change Password
            </span>
            
          </div>
        </div>
      </div>

      <div className="w-[80%] bg-white">
        {selectedTab === "all" && <div><Profile></Profile></div>}
        {selectedTab === "submitted" && <div><ChangPass></ChangPass></div>}
      </div>
    </div>
  );
};

export default Settings;

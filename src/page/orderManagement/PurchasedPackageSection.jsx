import { useState } from "react";
import { LuDownload, LuFileCheck, LuFileCheck2 } from "react-icons/lu";
import { MdLink } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TfiReload } from "react-icons/tfi";
import { PiFileImageDuotone } from "react-icons/pi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useUpdateTaskStatusMutation } from "../redux/api/ordersApi";
import { message } from "antd";

export const PurchasedPackageSection = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDownload = (files) => {
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.url.split("/").pop();
      link.target = "_blank";
      link.click();
    });
  };
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4 bg-[#F38E0A] text-white p-3 rounded-md">
        Purchased Package/Services
      </h2>

      {/* Package Services */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4">Package Services</h3>
        <div>
          {tasks?.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border border-gray-200 rounded-md p-4 mb-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  {service.serviceId?.title}
                </span>
                <div className="flex gap-2">
                  <button className="relative bg-[#2A216D] text-white w-[40px] h-[40px] items-center text-xl rounded pl-[10px] group">
                    <MdLink />
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 top-[-2rem] left-1/2 transform -translate-x-1/2">
                      View Link
                    </span>
                  </button>
                  {service.finishFile?.length > 0 && (
                    <button
                      onClick={() => handleDownload(service.finishFile)}
                      className="relative bg-[#2A216D] text-white w-[40px] h-[40px] items-center text-xl rounded pl-[10px] group"
                    >
                      <LuDownload />
                      <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 top-[-2rem] left-1/2 transform -translate-x-1/2">
                        Download
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <TaskStatuses service={service} setTasks={setTasks} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskStatuses = ({ service, setTasks }) => {
  const getStatusColor = (field) => {
    if (field === service.status) {
      return "text-[#2A216D]";
    } else {
      return "text-[#BDBAD2]";
    }
  };

  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  const handleUpdateTaskStatus = (status) => {
    try {
      updateTaskStatus({ status, taskId: service._id });
      message.success("Status updated successfully");
      setTasks((prevTasks) =>
        prevTasks?.map((task) =>
          task._id === service._id ? { ...task, status } : task
        )
      );
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  return (
    <div className="flex items-center space-x-2 border justify-between ml-4 px-5 py-3 rounded-md">
      <button
        onClick={() => handleUpdateTaskStatus("Pending")}
        className="relative text-red-300 text-[24px] group"
      >
        <TfiReload className={getStatusColor("Pending")} />
        <PopOver status="Pending" activeStatus={service.status} />
      </button>
      <button
        onClick={() => handleUpdateTaskStatus("Scheduled")}
        className="relative text-black text-[26px] group"
      >
        <SlCalender className={getStatusColor("Scheduled")} />
        <PopOver status="Scheduled" activeStatus={service.status} />
      </button>
      <button
        onClick={() => handleUpdateTaskStatus("Submitted")}
        className="relative text-black text-[26px] group"
      >
        <LuFileCheck className={getStatusColor("Submitted")} />
        <PopOver status="Submitted" activeStatus={service.status} />
      </button>
      <button
        onClick={() => handleUpdateTaskStatus("Delivered")}
        className="relative text-black text-[26px] group"
      >
        <LuFileCheck2 className={getStatusColor("Delivered")} />
        <PopOver status="Delivered" activeStatus={service.status} />
      </button>
      <button
        onClick={() => handleUpdateTaskStatus("Revisions")}
        className="relative text-black text-[26px] group"
      >
        <PiFileImageDuotone className={getStatusColor("Revisions")} />
        <PopOver status="Revisions" activeStatus={service.status} />
      </button>
      <button
        onClick={() => handleUpdateTaskStatus("Completed")}
        className="relative text-black text-[26px] group"
      >
        <IoCheckmarkDoneCircleSharp className={getStatusColor("Completed")} />
        <PopOver status="Completed" activeStatus={service.status} />
      </button>
    </div>
  );
};

const PopOver = ({ status, activeStatus }) => {
  const active = status === activeStatus;
  if (active) {
    return (
      <span className="absolute block border border-[#9D99BC] bg-white text-[#2A216D] text-sm rounded-md px-3 py-1 top-[-3rem] w-[100px] left-1/2 transform -translate-x-1/2">
        {status}
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-t-[#9D99BC] border-transparent"></span>
      </span>
    );
  } else {
    return (
      <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 top-[-2rem] w-[100px] left-1/2 transform -translate-x-1/2">
        {status}
      </span>
    );
  }
};

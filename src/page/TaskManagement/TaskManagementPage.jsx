import React, { useState } from "react";
import { CheckOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RejectTask } from "./RejectTask";
import { AssignModal } from "./AssignModal";
import { ToDoAdd } from "./ToDoAdd";
import { LiaFileExcel } from "react-icons/lia";
import { FaArrowRight } from "react-icons/fa";
import {
  useGetTasksQuery,
  useTakeTaskMutation,
  useGetAssignedTasksQuery,
} from "../redux/api/taskApi";
import dayjs from "dayjs";
import { message } from "antd";
export const TaskManagementPage = () => {
  const [modal2Open1, setModal2Open1] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal2Open3, setModal2Open3] = useState(false);
  const tasks = [
    {
      date: "Sunday, 18 January, 2025",
      tasks: [
        {
          type: "Photography",
          location: "Westheimer Rd. Santa Ana, Illinois 85",
        },
        { type: "Video", location: "Gray St. Utica, Pennsylvania 57867" },
        {
          type: "Floorplans",
          location: "Westheimer Rd. Santa Ana, Illinois 85",
        },
        { type: "Photography", location: "Elgin St. Celina, Delaware 10299" },
      ],
    },
    {
      date: "Sunday, 18 January, 2025",
      tasks: [
        { type: "Video", location: "Elgin St. Celina, Delaware 10299" },
        { type: "Floorplans", location: "Gray St. Utica, Pennsylvania 57867" },
        {
          type: "Photography",
          location: "Westheimer Rd. Santa Ana, Illinois 85",
        },
      ],
    },
  ];

  const toDoList = [
    { date: "16/05/24", description: "Empty the SD card" },
    { date: "12/04/24", description: "Empty the SD card" },
    { date: "07/04/24", description: "Empty the SD card" },
    { date: "15/03/24", description: "Empty the SD card" },
  ];

  const {
    data: openProductionWork,
    isLoading: isLoadingOpenProductionWork,
    refetch: refetchOpenProductionWork,
  } = useGetTasksQuery();
  const {
    data: assignedTasks,
    isLoading: isLoadingAssignedTasks,
    refetch: refetchAssignedTasks,
  } = useGetAssignedTasksQuery();

  const [takeTask, { isLoading: isTakingTask }] = useTakeTaskMutation();

  const refetchTasks = () => {
    refetchAssignedTasks();
    refetchOpenProductionWork();
  };

  const formatAddress = (address) => {
    const addressArray = [
      address?.streetAddress,
      address?.streetName,
      address?.city,
      address?.zipCode,
    ].filter(Boolean);
    if (addressArray.length === 0) return "N/A";
    return addressArray.join(", ");
  };

  const handleTakeTask = (id) => {
    try {
      takeTask(id);
      message.success("Task taken successfully");
      refetchTasks();
    } catch (error) {
      console.log(error);
      message.error("Task taken failed");
    }
  };
  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-2 gap-6">
        {/* Assigned to Me Section */}
        <div className="p-4  bg-white ">
          <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
            Assigned To Me
          </h3>
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            {assignedTasks?.data?.length > 0 &&
              assignedTasks?.data?.map((task, index) => (
                <div key={index} className="mb-4 border py-5">
                  <div className="bg-[#F38E0A] text-white text-center  w-[400px] m-auto rounded-full py-2 font-semibold">
                    {dayjs(task.createdAt).format("dddd, DD MMMM, YYYY")}
                  </div>
                  <div className=" p-3 rounded-b-lg">
                    {task.tasks.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center mb-2  pb-2"
                      >
                        <div>
                          <p className="font-semibold">{item?.service?.title}</p>
                          <p className="text-sm text-gray-600">
                            {formatAddress(item?.order?.address)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.status === "Completed" ? (
                            <button className="bg-[#009D2A] text-white p-2 w-10 h-10 rounded">
                              <CheckOutlined />
                            </button>
                          ) : (
                            <button className="bg-[#F38E0A] text-white p-2 w-10 h-10 rounded">
                              <PendingIcon />
                            </button>
                          )}
                          <Link
                            to={`/dashboard/task-management/all-Services/project-file/${item._id}`}
                          >
                            <button className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded">
                              <EyeOutlined />
                            </button>
                          </Link>
                          <button
                            onClick={() => setModal2Open1(item._id)}
                            className="bg-[#D80027] text-white text-2xl p-2 w-10 h-10 rounded"
                          >
                            <LiaFileExcel />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <RejectTask
            setModal2Open1={setModal2Open1}
            modal2Open1={modal2Open1}
            refetchTasks={refetchTasks}
          />
        </div>

        {/* Open Production Work Section */}
        <div className="p-4  bg-white ">
          <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
            Open Production Work
          </h3>
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            {openProductionWork?.data?.length > 0 &&
              openProductionWork?.data?.map((task) => (
                <div key={task._id} className="border py-5">
                  <div className="bg-[#F38E0A] text-white text-center  w-[400px] m-auto rounded-full py-2 font-semibold">
                    {dayjs(task.createdAt).format("dddd, DD MMMM, YYYY")}
                  </div>
                  <div className=" p-3 ">
                    {task.tasks.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center mb-2 pb-2"
                      >
                        <div>
                          <p className="font-semibold">{item?.service?.title}</p>
                          <p className="text-sm text-gray-600">
                            {formatAddress(item?.order?.address)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTakeTask(item._id)}
                            className="bg-[#9B3C7B] text-white px-4 py-2 rounded"
                          >
                            Take
                          </button>
                          <Link
                            to={`/dashboard/task-management/all-Services/project-file/${item._id}`}
                          >
                            <button className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded">
                              <EyeOutlined />
                            </button>
                          </Link>
                          <button
                            onClick={() => setModal2Open(item._id)}
                            className="bg-[#F38E0A] text-white p-2 w-10 h-10 rounded text-2xl"
                          >
                            <FaArrowRight />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <AssignModal
            setModal2Open={setModal2Open}
            modal2Open={modal2Open}
            refetchTasks={refetchTasks}
          />
        </div>
      </div>

      {/* To Do List and Upload Source Files */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* To Do List Section */}
        <div className="p-4  rounded-lg bg-white">
          <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 ">
            To Do List{" "}
            <button
              onClick={() => setModal2Open3(true)}
              className="bg-[#F38E0A] w-8 h-8 rounded text-lg text-white "
            >
              +
            </button>
          </h3>
          <div
            className="overflow-y-auto border py-5"
            style={{ maxHeight: "300px" }}
          >
            {toDoList.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2  pb-2"
              >
                <p>{item.date}</p>
                <p className="flex-1 text-center">{item.description}</p>
                <div className="flex items-center gap-2">
                  <button className="bg-[#009D2A] text-white p-2 w-10 h-10 rounded">
                    <CheckOutlined />
                  </button>
                  <button className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded">
                    <EyeOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ToDoAdd
          setModal2Open3={setModal2Open3}
          modal2Open3={modal2Open3}
        ></ToDoAdd>

        {/* Upload Source Files Section */}
        <div className="p-4  bg-white ">
          <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
            Upload Source Files
          </h3>
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            {tasks.map((task, index) => (
              <div key={index} className="mb-4 border py-5">
                <div className="bg-[#F38E0A] text-white text-center  w-[400px] m-auto rounded-full py-2 font-semibold">
                  {task.date}
                </div>
                <div className=" p-3">
                  {task.tasks.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center mb-2 pb-2"
                    >
                      <div>
                        <p className="font-semibold">{item.type}</p>
                        <p className="text-sm text-gray-600">{item.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-[#009D2A] text-white p-2 w-10 h-10 rounded">
                          <CheckOutlined />
                        </button>
                        <button className="bg-[#F38E0A] text-white p-2 w-10 h-10 text-2xl rounded">
                          <UploadOutlined />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PendingIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    <circle cx="7" cy="12" r="1.5"></circle>
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="17" cy="12" r="1.5"></circle>
  </svg>
);

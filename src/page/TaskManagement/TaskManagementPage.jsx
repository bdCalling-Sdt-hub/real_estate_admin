import { useEffect, useRef, useState } from "react";
import {
  CheckOutlined,
  EyeOutlined,
  ScheduleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RejectTask } from "./RejectTask";
import { AssignModal } from "./AssignModal";
import { LiaFileExcel } from "react-icons/lia";
import { FaArrowRight } from "react-icons/fa";
import {
  useTakeTaskMutation,
  useGetAssignedTasksQuery,
  useGetNewTaskQuery,
  useUpdateTaskStatusMutation,
  useToggleTaskStatusMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
  useGetProductionTasksQuery,
} from "../redux/api/taskApi";
import dayjs from "dayjs";
import { Button, message, Modal, Spin, Upload } from "antd";
import handleFileUpload from "../../utils/handleFileUpload";
import { useSelector } from "react-redux";
import { formatAddress } from "../../utils/formatAddress";
import { useGetProfileQuery } from "../redux/api/userApi";
import { ToDoAdd } from "./ToDoAdd";

export const TaskManagementPage = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [assignedTasksPage, setAssignedTasksPage] = useState(1);

  const tasks = {
    productionTasks: useGetProductionTasksQuery(),
    assignedTasks: useGetAssignedTasksQuery({ page: assignedTasksPage }),
    newTasks: useGetNewTaskQuery(),
  };

  const {
    productionTasks: {
      data: openProductionWork,
      refetch: refetchOpenProductionWork,
    },
    assignedTasks: {
      data: assignedTasksQuery,
      isLoading: assignedTasksLoading,
      refetch: refetchAssignedTasks,
    },
    newTasks: { data: newTasks, refetch: refetchNewTasks },
  } = tasks;

  const [assignedTasks, setAssignedTasks] = useState(null);

  useEffect(() => {
    if (assignedTasksQuery && !assignedTasks) {
      setAssignedTasks(assignedTasksQuery);
    }
  }, [assignedTasksQuery, assignedTasks]);

  const [takeTask] = useTakeTaskMutation();

  const refetchTasks = () => {
    refetchAssignedTasks().then((data) => setAssignedTasks(data?.data));
    refetchOpenProductionWork();
    refetchNewTasks();
  };

  const handleTakeTask = async (id) => {
    try {
      await takeTask(id);
      message.success("Task taken successfully");
      refetchTasks();
    } catch (error) {
      message.error("Task taken failed");
    }
  };

  const { data: profile } = useGetProfileQuery();
  const role = profile?.data?.role;
  return (
    <div className="p-6 bg-white grid grid-cols-1 gap-4 md:grid-cols-2">
      <AssignedToMe
        assignedTasks={assignedTasks}
        setAssignedTasks={setAssignedTasks}
        page={assignedTasksPage}
        setPage={setAssignedTasksPage}
        refetchTasks={refetchTasks}
        loading={assignedTasksLoading}
      />

      {/* Open Production Work Section */}
      <div className="p-4 bg-white ">
        <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
          Open Production Work
        </h3>
        <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
          {openProductionWork?.data?.length > 0 &&
            openProductionWork?.data?.map((task) => (
              <div key={task._id} className="border py-5">
                <div className="bg-[#F38E0A] text-white text-center  w-[400px] m-auto rounded-full py-2 font-semibold">
                  {dayjs(task._id).format("dddd, DD MMMM, YYYY")}{" "}
                </div>
                <div className=" p-3 ">
                  {task.tasks.map((item) => (
                    <div
                      key={item?._id}
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
                          onClick={() => handleTakeTask(item?._id)}
                          className="bg-[#9B3C7B] text-white px-4 py-2 rounded"
                        >
                          Take
                        </button>
                        <Link
                          to={`/dashboard/task-management/all-Services/project-file/${item?._id}`}
                        >
                          <button className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded">
                            <EyeOutlined />
                          </button>
                        </Link>
                        {role !== "MEMBER" && (
                          <button
                            onClick={() => setModal2Open(item?._id)}
                            className="bg-[#F38E0A] text-white p-2 w-10 h-10 rounded text-2xl"
                          >
                            <FaArrowRight />
                          </button>
                        )}
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
      <TodoList />
      <UploadSourceFiles newTasks={newTasks} refetchTasks={refetchTasks} />
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

const AssignedToMe = ({
  assignedTasks,
  setAssignedTasks,
  page,
  setPage,
  loading,
  refetchTasks,
}) => {
  const [modal2Open1, setModal2Open1] = useState(false);
  const [toggleTaskLoading, setToggleTaskLoading] = useState(false);
  const [toggleTaskStatus] = useToggleTaskStatusMutation();
  const containerRef = useRef(null);

  const handleToggleStatus = async ({ _id }) => {
    setToggleTaskLoading(_id);
    try {
      await toggleTaskStatus(_id);
      message.success("Task status successfully updated!");
    } catch (error) {
      console.log(error);
      message.error("Task status update failed");
    } finally {
      setToggleTaskLoading(false);
      refetchTasks();
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      // If user scrolls near the bottom, load next page
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, setPage]);

  useEffect(() => {
    if (page === 1) return;

    setAssignedTasks((prevTasks) => {
      if (!prevTasks?.data?.tasksByDate) return assignedTasks;

      return {
        ...prevTasks,
        data: {
          ...prevTasks.data,
          tasksByDate: [
            ...prevTasks.data.tasksByDate,
            ...assignedTasks.data.tasksByDate,
          ],
        },
      };
    });
  }, [assignedTasks]);

  return (
    <div className="p-4 bg-white">
      <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
        Assigned To Me
      </h3>
      <div
        ref={containerRef}
        className="overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        {assignedTasks?.data?.tasksByDate?.length > 0 &&
          assignedTasks?.data?.tasksByDate?.map((task, index) => (
            <div key={index} className="mb-4 border py-5">
              <div className="bg-[#F38E0A] text-white text-center w-[400px] m-auto rounded-full py-2 font-semibold">
                {dayjs(task._id).format("dddd, DD MMMM, YYYY")}
              </div>
              <div className="p-3 rounded-b-lg">
                {task.tasks.map((item) => (
                  <div
                    key={item?._id}
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
                        onClick={() => handleToggleStatus(item)}
                        className={`${
                          item?.status === "Delivered"
                            ? "bg-[#009D2A]"
                            : "bg-[#F38E0A]"
                        } text-white p-2 w-10 h-10 rounded`}
                      >
                        {toggleTaskLoading === item?._id ? (
                          <Spin />
                        ) : item?.status === "Delivered" ? (
                          <CheckOutlined />
                        ) : (
                          <PendingIcon />
                        )}
                      </button>
                      <Link
                        to={`/dashboard/task-management/all-Services/project-file/${item?._id}`}
                      >
                        <button className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded">
                          <EyeOutlined />
                        </button>
                      </Link>
                      <button
                        onClick={() => setModal2Open1(item)}
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
      {loading && <p className="text-center">Loading more tasks...</p>}
      <RejectTask
        setModal2Open1={setModal2Open1}
        modal2Open1={modal2Open1}
        refetchTasks={refetchTasks}
      />
    </div>
  );
};

const TodoList = () => {
  const [open, setOpen] = useState(false);
  const { data: todos, refetch } = useGetTodoListQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  const handleUpdate = async (id) => {
    setUpdateLoading(id);
    try {
      await updateTodo(id);
      message.success("Todo updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Todo update failed");
    } finally {
      refetch();
      setUpdateLoading(false);
    }
  };
  return (
    <>
      {/* To Do List Section */}
      <div className="p-4 rounded-lg bg-white">
        <h3 className="flex items-center justify-center gap-2 font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 ">
          Todo List
          <button
            onClick={() => setOpen(true)}
            className="bg-[#F38E0A] w-8 h-8 rounded text-lg text-white "
          >
            +
          </button>
        </h3>
        <div
          className="overflow-y-auto border py-5"
          style={{ maxHeight: "300px" }}
        >
          {todos?.data?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 pb-2 px-4"
            >
              <p>{dayjs(item.dueDate).format("DD/MM/YYYY")}</p>
              <p className="text-center">{item.description}</p>
              <div className="flex items-center gap-2">
                {item?.status === "Pending" ? (
                  <button
                    onClick={() => handleUpdate(item?._id)}
                    className="bg-[#F38E0A] text-white p-2 w-10 h-10 rounded"
                  >
                    {updateLoading === item?._id ? (
                      <Spin />
                    ) : (
                      <ScheduleOutlined />
                    )}
                  </button>
                ) : (
                  <button className="bg-[#009D2A] text-white p-2 w-10 h-10 rounded">
                    <CheckOutlined />
                  </button>
                )}
                <button
                  onClick={() => setDetailsModal(item)}
                  className="bg-[#2A216D] text-white p-2 w-10 h-10 rounded"
                >
                  <EyeOutlined />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailsModal open={detailsModal} setOpen={setDetailsModal} />
      <ToDoAdd setOpen={setOpen} open={open} refetch={refetch} />
    </>
  );
};

const DetailsModal = ({ open, setOpen }) => {
  console.log(open);

  return (
    <Modal
      title="Todo Details"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Close
        </Button>,
      ]}
    >
      <div>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {open?.description}
        </p>
        <p>
          <span className="font-semibold">Due Date:</span>{" "}
          {dayjs(open?.dueDate).format("DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {open?.status}
        </p>
      </div>
    </Modal>
  );
};

const UploadSourceFiles = ({ newTasks, refetchTasks }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const token = useSelector((state) => state.logInUser.token);

  const uploadProps = (task) => ({
    name: "sourceFile",
    accept: "image/*, video/*",
    itemRender() {},
    customRequest: async (options) => {
      setUploadLoading(task._id);
      try {
        const formData = new FormData();
        formData.append("sourceFile", options.file);
        await handleFileUpload({
          formData: formData,
          action: `/task/add-source-file/${task._id}`,
          method: "PATCH",
          token: token,
        });
        message.success("File uploaded successfully");
        refetchTasks();
      } catch (error) {
        console.log(error);
        message.error("File upload failed");
      } finally {
        setUploadLoading(false);
      }
    },
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [updateTaskLoading, setUpdateTaskLoading] = useState(false);

  const handleUpdateTaskStatus = async ({ id, status }) => {
    setUpdateTaskLoading(id);
    try {
      await updateTaskStatus({
        taskId: id,
        status: status === "Submitted" ? "Pending" : "Submitted",
      });

      message.success("Task status updated successfully!");
    } catch (error) {
      console.log(error);
      message.success("Task status update failed");
    } finally {
      setUpdateTaskLoading(false);
      refetchTasks();
    }
  };
  return (
    <div className="p-4 bg-white ">
      <h3 className="text-center font-semibold text-[#9B3C7B] border border-[#9B3C7B] p-3 mb-3">
        Upload Source Files
      </h3>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        {newTasks?.data?.data?.length > 0 &&
          newTasks?.data?.data?.map((task, index) => (
            <div key={index} className="mb-4 border py-5">
              <div className="bg-[#F38E0A] text-white text-center  w-[400px] m-auto rounded-full py-2 font-semibold">
                {dayjs(task._id).format("dddd, DD MMMM, YYYY")}{" "}
              </div>
              <div className=" p-3">
                {task.tasks.map((item, idx) => (
                  <div
                    key={idx}
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
                        onClick={() =>
                          handleUpdateTaskStatus({
                            id: item?._id,
                            status: item?.status,
                          })
                        }
                        className={`${
                          item?.status === "Submitted"
                            ? "bg-[#009D2A]"
                            : "bg-[#F38E0A]"
                        } text-white p-2 w-10 h-10 rounded`}
                      >
                        {updateTaskLoading === item?._id ? (
                          <Spin />
                        ) : item?.status === "Submitted" ? (
                          <CheckOutlined />
                        ) : (
                          <ScheduleOutlined />
                        )}
                      </button>
                      <Upload {...uploadProps(item)}>
                        {uploadLoading === item?._id ? (
                          <button className="bg-[#F38E0A] text-white w-10 h-10 text-2xl rounded">
                            <Spin />
                          </button>
                        ) : (
                          <button className="bg-[#F38E0A] text-white w-10 h-10 text-2xl rounded">
                            <UploadOutlined />
                          </button>
                        )}
                      </Upload>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

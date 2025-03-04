import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete, Drawer } from "antd";
import { useGetProfileQuery } from "../../page/redux/api/userApi";
import { imageUrl } from "../../page/redux/api/baseApi";
import {
  useGetOrderStatusQuery,
  useGetSearchQuery,
} from "../../page/redux/api/dashboardApi";
import {
  useGetAllNotificationQuery,
  useUpdateSeenNotificationMutation,
} from "../../page/redux/api/clientManageApi";
import { LuBell } from "react-icons/lu";
import { FaBars, FaJediOrder } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { IoBagOutline, IoSettingsOutline } from "react-icons/io5";
import { RiImageEditLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import { PiClockUserLight, PiInvoice } from "react-icons/pi";
import { LiaUsersSolid } from "react-icons/lia";
import logo from "../../assets/header/logo1.png";
import './head.css'
const Header = () => {
  const { data: getProfile } = useGetProfileQuery();
  const { data: AllSearch } = useGetSearchQuery();
  const { data: notificationData } = useGetAllNotificationQuery();
  const { data: status } = useGetOrderStatusQuery();
  const [updateSeenNotif] = useUpdateSeenNotificationMutation();

  const options =
    AllSearch?.data
      ?.map((item) => ({
        value: `${item.address.streetName} - ${item.taskIds
          ?.map((task) => task.serviceId?.title)
          .join(", ")}`,
        key: item._id, // Store the _id as a key
        label: `${item.address.streetName} - ${item.taskIds
          ?.map((task) => task.serviceId?.title)
          .join(", ")}`, // Used for display
      }))
      .map((option) => ({
        value: option.label,
        key: option.key,
        label: (
          <Link
            to={`/dashboard/order-management/order-details/${option.key}`}
            style={{ display: "block", width: "100%" }}
          >
            {option.label}
          </Link>
        ),
      })) || [];

  const [open, setOpen] = useState(false);

  const unSeenNotification = notificationData?.data?.notifications?.filter(
    (data) => !data.status
  );

  const pills = {
    totalOrder: {
      title: "Total Orders",
      count: status?.data?.totalOrders || 0,
      url: "/dashboard/order-management/all",
    },
    inProgress: {
      title: "In-Progress",
      count: status?.data?.pendingOrders || 0,
      secondaryCount: status?.data?.totalOrders || 0,
      url: "/dashboard/order-management/progress",
    },
    completed: {
      title: "Completed",
      count: status?.data?.completeOrders || 0,
      secondaryCount: status?.data?.totalOrders || 0,
      url: "/dashboard/order-management/completed",
    },
  };
  return (
    <div className="bg-[#FEFEFE] text-white h-[120px] flex items-center px-8 justify-between gap-2">
      <div className="flex lg:hidden items-center gap-4">
        <FaBars
          className="text-2xl cursor-pointer lg:hidden text-gray-700"
          onClick={() => setOpen(true)}
        />
        <Link to="/">
          <img src={logo} alt="Logo" className="min-w-20 w-20" />
        </Link>
      </div>
      <div className="pills lg:flex hidden">
        {Object.keys(pills).map((key) => (
          <Pill key={key} {...pills[key]} />
        ))}
      </div>
      <div className="flex w-full justify-end items-center gap-4">
        <AutoComplete
          className="hidden md:block flex-1 max-w-md w-full "
          options={options}
          placeholder="Search for orders..."
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            to="/dashboard/Settings/notification"
            className="relative"
            onClick={() => unSeenNotification?.length && updateSeenNotif()}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-[#2A216D] text-xl">
              <LuBell />
            </div>
            {unSeenNotification?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2A216D] text-white text-xs px-2 py-0.5 rounded-full">
                {unSeenNotification.length}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 shrink-0"
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={`${imageUrl}${getProfile?.data?.profile_image}`}
              alt="profile"
            />
            <div className="hidden md:block text-end">
              <h3 className="text-sm font-semibold text-black">
                {getProfile?.data?.name}
              </h3>
              <h4 className="text-xs text-gray-500">
                {getProfile?.data?.role}
              </h4>
            </div>
          </Link>
        </div>
      </div>
      <SideDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;

const Pill = ({ url, title, count, secondaryCount }) => (
  <Link to={url}>
    <div>
      <div className="bg-slate-200 py-1 px-1 rounded-full text-black flex items-center">
        <span className="px-3 text-nowrap">{title}</span>
        <div className="bg-[#F38E0A] p-2 rounded-full text-white w-[35px] h-[35px] flex items-center justify-center">
          {count}
        </div>
        {secondaryCount && (
          <div className="bg-[#9B3C7B] p-2 rounded-full text-white w-[35px] h-[35px] flex items-center justify-center -ml-1">
            {secondaryCount}
          </div>
        )}
      </div>
    </div>
  </Link>
);

const SideDrawer = ({ open, setOpen }) => {
  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard />,
      link: "/",
    },
    {
      key: "messageMail",
      label: "Message/Mail",
      icon: <AiOutlineMail />,
      link: "/dashboard/message-mail",
    },
    {
      key: "TaskManagement",
      label: "Task Management",
      icon: <IoBagOutline />,
      link: "/dashboard/task-managementPage",
    },
    {
      key: "orderManagement",
      label: "Order Management",
      icon: <FaJediOrder />,
      link: "/dashboard/order-management",
    },
    {
      key: "Services",
      label: "Services",
      icon: <RiImageEditLine />,
      link: "/dashboard/services",
    },

    {
      key: "Packages",
      label: "Packages",
      icon: <GoPackage />,
      link: "/dashboard/packages",
    },
    {
      key: "ServiceCategories",
      label: "Service Categories",
      icon: <MdOutlineCategory />,
      link: "/dashboard/service-categories",
    },
    {
      key: "PricingGroup",
      label: "Pricing Group",
      icon: <RiMoneyDollarBoxLine />,
      link: "/dashboard/pricing-group",
    },

    {
      key: "clientManagement",
      label: "Client Management",
      icon: <PiClockUserLight />,
      link: "/dashboard/client-management",
    },
    {
      key: "Team-Member",
      label: "Team-Member",
      icon: <LiaUsersSolid />,
      link: "/dashboard/team-member",
    },
    {
      key: "report",
      label: "Report",
      icon: <PiInvoice />,
      link: "/dashboard/report",
    },
    {
      key: "InvoiceOrder",
      label: "Invoice Order",
      icon: <PiInvoice />,
      link: "/dashboard/invoice-order",
    },
    {
      key: "Settings",
      label: "Settings",
      icon: <IoSettingsOutline />,
      link: "/dashboard/settings",
    },
  ];

  const [selectedKey, setSelectedKey] = useState("dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Drawer placement="left" onClose={() => setOpen(false)} open={open}>
      <div className="h-auto bg-[#FEFEFE] shadow-sm">
        <div>
          <div className="flex justify-center">
            <div className="fixed z-30 top-0 mt-5 mb-8">
              <img src={logo} alt="Logo" className="w-[160px]" />
            </div>
          </div>
          <div className="mx-5 mb-6 fixed z-40 top-[100px] w-[280px]">
            <Link to={"/dashboard/create-new-order"}>
              <button className="bg-[#2A216D] text-white py-2 w-full rounded">
                + Create Order
              </button>
            </Link>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="menu-items mt-24">
          {items.map((item, index) => (
            <div key={item.key}>
              {/* Add Section Titles */}
              {index === 4 && (
                <div className="section-title px-9 py-2 text-gray-500 font-bold">
                  Catalogue
                </div>
              )}
              {index === 8 && (
                <div className="section-title px-9 py-2 text-gray-500 font-bold">
                  Accounts
                </div>
              )}
              {index === 10 && (
                <div className="section-title px-9 py-2 text-gray-500 font-bold">
                  Business
                </div>
              )}

              <Link
                to={item.link}
                className={`menu-item my-1 mr-5 py-3 px-3 pl-9 flex items-center cursor-pointer ${
                  selectedKey === item.key
                    ? "bg-[#EAE9F0] rounded-r-md"
                    : "rounded-r-md  hover:bg-gray-200"
                }`}
                onClick={() => setSelectedKey(item.key)}
              >
                <span className="w-4 h-4 mr-3">{item.icon}</span>
                <span className="block w-full text-black">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex bg-white text-start rounded-md text-black p-3"
          >
            <span className="text-2xl">
              <IoIosLogIn />
            </span>
            <span className="ml-3">Log Out</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};

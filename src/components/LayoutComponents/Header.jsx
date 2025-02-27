import { LuBell } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaJediOrder } from "react-icons/fa";

import { useRef, useState } from "react";
import { Drawer, Input, Radio, Space } from "antd";

import logo from "../../assets/header/logo1.png";

import { FaChevronRight } from "react-icons/fa";

import { IoIosLogIn } from "react-icons/io";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { IoBagOutline, IoSettingsOutline } from "react-icons/io5";
import { RiImageEditLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import { PiClockUserLight, PiInvoice } from "react-icons/pi";
import { LiaUsersSolid } from "react-icons/lia";
import { useGetProfileQuery } from "../../page/redux/api/userApi";
import { imageUrl } from "../../page/redux/api/baseApi";
import { useGetOrderStatusQuery, useGetStatusQuery } from "../../page/redux/api/dashboardApi";
import { useGetAllNotificationQuery, useUpdateSeenNotificationMutation } from "../../page/redux/api/clientManageApi";

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
  // {
  //   key: "categoriesManagement",
  //   label: "Categories Management",
  //   icon: categorie,
  //   link: "/dashboard/CategoriesManagement/Categories",
  //   children: [
  //     {
  //       key: "categoriesManagement",
  //       label: "Categories",
  //       link: "/dashboard/CategoriesManagement/Categories",
  //     },
  //     {
  //       key: "subcategory",
  //       label: "Subcategory",
  //       link: "/dashboard/CategoriesManagement/Subcategory",
  //     },
  //   ],
  // },

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

const Header = () => {
   const{data:getProfile} = useGetProfileQuery();
 
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const { data: notificationData } = useGetAllNotificationQuery();
  const [updateSeenNotif] = useUpdateSeenNotificationMutation();
  const navigate = useNavigate();
  // const location = useLocation();

  const { data: status } = useGetOrderStatusQuery();
  

  const contentRef = useRef({});

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

 
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const unSeenNotification = notificationData?.data?.notifications?.filter(data => !data.status);
  const handleOnclick = () => {
    if (unSeenNotification?.length) {
      // Update the notifications status to seen (true) when clicked
      updateSeenNotif();
    }
  };
  return (
    <div className="bg-[#FEFEFE] text-white pt-[24px]">
      <div className="lg:hidden ">
        <div className="py-3 pl-4">
          <div onClick={showDrawer} className="text-3xl text-black">
            <FaBars />
          </div>
        </div>
      </div>
      <div className="lg:flex justify-between ">
        <div className="">
          <div className="mt-1 lg:flex gap-6 lg:ml-7 space-y-3 lg:space-y-0">
          <Link to={'/dashboard/order-management/all'}>
            <div>
              <div className="bg-slate-200 py-1 px-1 rounded-full text-black flex items-center ">
                <span className="px-3">Total Order</span>{" "}
                <div className="bg-[#9B3C7B] p-2  rounded-full text-white w-[35px] h-[35px] flex items-center justify-center">
                {status?.data?.totalOrders || "0"}
                </div>
              </div>
            </div></Link>
            <Link to={"/dashboard/order-management/progress"}>
              <div>
                <div className="bg-slate-200 py-1 px-1 rounded-full text-black flex items-center ">
                  <span className="px-3">In-Progress</span>{" "}
                  <div className="bg-[#F38E0A] p-2  rounded-full text-white w-[35px] h-[35px] flex items-center justify-center">
                  {status?.data?.pendingOrders || "0"}
                  </div>
                  <div className="bg-[#9B3C7B] p-2 rounded-full text-white w-[35px] h-[35px] flex items-center justify-center -ml-1">
                  {status?.data?.totalOrders || "0"}
                  </div>
                </div>
              </div>
            </Link>
            <Link to={'/dashboard/order-management/completed'}>
            <div>
              <div className="bg-slate-200 py-1 px-1 rounded-full text-black flex items-center ">
                <span className="px-3">Completed</span>{" "}
                <div className="bg-green-800 p-2  rounded-full text-white w-[35px] h-[35px] flex items-center justify-center">
                {status?.data?.completeOrders || "0"} 
                </div>
                <div className="bg-[#9B3C7B] p-2 rounded-full text-white w-[35px] h-[35px] flex items-center justify-center -ml-1">
                {status?.data?.totalOrders || "0"}
                </div>
              </div>
            </div></Link>
            
          </div>
        </div>

        <div></div>
        <div className="flex gap-8 p-1 px-6">
          <div>
            <Input
              className="py-2 rounded-full"
              placeholder="Search here..."
              style={{ width: 400 }}
            />
          </div>

          <div className="relative">
            <Link to={"/dashboard/Settings/notification"}>
            <div onClick={handleOnclick} className="w-[45px] h-[45px] flex items-center justify-center text-xl rounded-full bg-neutral-100 text-[#2A216D] ">
                <span>
                  <LuBell />
                </span>
              </div>
            </Link>

            <Space>
              <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            </Space>
            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
            >
              <div className="custom-sidebar h-auto  bg-[#FEFEFE] shadow-sm">
                {/* Logo */}
                <div className="">
                  <div className="flex justify-center">
                    <div className="custom-sidebar-logo fixed z-30 top-0  mt-5 mb-8">
                      <img src={logo} alt="Logo" className="w-[160px]" />
                    </div>
                  </div>
                  <div className="mx-5 mb-6 fixed z-40 top-[100px] w-[280px] ">
                    <Link to={"/dashboard/create-new-order"}>
                      <button className="bg-[#2A216D] text-white py-2 w-full rounded">
                        + Create Order
                      </button>
                    </Link>
                  </div>
                  <div className="bg-white h-[152px] fixed w-[320px]"></div>
                </div>

                {/* Sidebar Menu */}
                <div className="menu-items mt-40">
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
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            onParentClick(item.key);
                          } else {
                            setSelectedKey(item.key);
                          }
                        }}
                      >
                        <span className="w-4 h-4 mr-3">{item.icon}</span>
                        <span className="block w-full text-black">
                          {item.label}
                        </span>

                        {item.children && (
                          <FaChevronRight
                            className={`ml-auto transform transition-all duration-300 ${
                              expandedKeys.includes(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {item.children && (
                        <div
                          className={`children-menu bg-white -my-2 mx-5 text-black transition-all duration-300 ${
                            expandedKeys.includes(item.key) ? "expanded" : ""
                          }`}
                          style={{
                            maxHeight: expandedKeys.includes(item.key)
                              ? `${
                                  contentRef.current[item.key]?.scrollHeight
                                }px`
                              : "0",
                          }}
                          ref={(el) => (contentRef.current[item.key] = el)}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              to={child.link}
                              className={`menu-item p-4 flex items-center cursor-pointer ${
                                selectedKey === child.key
                                  ? "bg-[#EDC4C5]"
                                  : "hover:bg-gray-200"
                              }`}
                              onClick={() => {
                                setSelectedKey(child.key);
                                setExpandedKeys([]);
                              }}
                            >
                              <span className="block w-full text-black">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
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

            <span className="absolute top-0 right-0 -mr-2  w-5 h-5 bg-[#2A216D] text-white text-xs flex items-center justify-center rounded-full">
              {unSeenNotification?.length || "0"}
            </span>
          </div>

          <Link to={"/dashboard/settings"}>
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[45px] h-[45px] rounded-full"
                  src={`${imageUrl}${getProfile?.data?.profile_image}`}
                  alt="profile"
                />
              </div>
              <div className="text-end text-black">
                <h3 className="text-lg font-semibold">{getProfile?.data?.name}</h3>
                <h4 className="text-sm">{getProfile?.data?.role}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

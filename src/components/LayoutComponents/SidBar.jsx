import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaJediOrder } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { PiClockUserLight, PiInvoice } from "react-icons/pi";
import { RiImageEditLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import { LiaUsersSolid } from "react-icons/lia";
import { IoBagOutline, IoSettingsOutline } from "react-icons/io5";

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
    link: "/dashboard/order-management/all",
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

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    const parentItem = items.find(
      (item) =>
        item.link === currentPath ||
        (item.children &&
          item.children.some((child) => child.link === currentPath))
    );

    if (parentItem) {
      setSelectedKey(
        parentItem.children
          ? parentItem.children.find((child) => child.link === currentPath)
              ?.key || parentItem.key
          : parentItem.key
      );

      if (parentItem.children && !expandedKeys.includes(parentItem.key)) {
        setExpandedKeys([...expandedKeys, parentItem.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
        <div className="bg-white h-[152px] fixed w-[320px]">
         
        </div>
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
              <span className="block w-full text-black">{item.label}</span>

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
                    ? `${contentRef.current[item.key]?.scrollHeight}px`
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
  );
};

export default SidBar;

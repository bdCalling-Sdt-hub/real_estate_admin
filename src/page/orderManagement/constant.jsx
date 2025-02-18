import { Avatar, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Order ID",
    dataIndex: "_id",
    key: "_id",
    width: "10%",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
    width: "10%",
    render: (orderDate) => {
      const date = new Date(orderDate);
      return date.toLocaleDateString();
    },
  },
  {
    title: "Company/Client",
    dataIndex: "client",
    key: "client",
    render: (client) => (
      <div className="flex items-center">
        <Avatar
          src={client?.profile_image || "https://i.pravatar.cc/40?img=1"}
          alt={client?.name}
        />
        <span style={{ marginLeft: 8 }}>{client?.name}</span>
      </div>
    ),
    width: "20%",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: "20%",
    render: (address) => {
      const { street, city, state, zip } = address;
      const addressArray = [street, city, state, zip];
      return addressArray.filter(Boolean).join(", ");
    },
  },
  {
    title: "Services",
    dataIndex: "servicesCount",
    key: "servicesCount",
    width: "8%",
  },
  {
    title: "Total",
    dataIndex: "totalAmount",
    key: "totalAmount",
    width: "8%",
    render: (totalAmount) =>
      totalAmount?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
  {
    title: "Appointments",
    dataIndex: "appointment",
    key: "appointment",
    width: "15%",
    render: (appointment) => appointment || "N/A",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color =
        status === "In Production"
          ? "purple"
          : status === "Delivered"
          ? "green"
          : "red";
      return <Tag color={color}>{status}</Tag>;
    },
    width: "10%",
  },
  {
    title: "Payment",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (payment) => {
      let color =
        payment === "Paid" ? "green" : payment === "Unpaid" ? "red" : "yellow";
      return <Tag color={color}>{payment}</Tag>;
    },
    width: "10%",
  },
  {
    title: "Details",
    key: "details",
    render: () => (
      <Link to={"/dashboard/order-management/order-details"}>
        {" "}
        <button className="w-10 h-10 text-white bg-[#2A216D] rounded text-xl">
          <EyeOutlined />
        </button>
      </Link>
    ),
    width: "5%",
  },
];

export { columns };

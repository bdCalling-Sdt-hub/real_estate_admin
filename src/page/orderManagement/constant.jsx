import { Avatar, Menu, Tag } from "antd";
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
          src={
            client?.profile_image
              ? `${import.meta.env.VITE_API_URL}${client?.profile_image}`
              : `https://ui-avatars.com/api/?name=${client?.name}`
          }
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
    render: (appointment) => {
      if (appointment) {
        return appointment;
      } else {
        return "N/A";
      }
    },
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
    key: "_id",
    dataIndex: "_id",
    render: (id) => (
      <Link to={`/dashboard/order-management/order-details/${id}`}>
        {" "}
        <button className="w-10 h-10 text-white bg-[#2A216D] rounded text-xl">
          <EyeOutlined />
        </button>
      </Link>
    ),
    width: "5%",
  },
];

const menu = (id, setModal2Open, setRemoveModalOpen) => (
  <Menu>
    <Menu.Item key="1">
      <Link to={`/dashboard/order-management/order-details/edit-order/${id}`}>
        Edit Order
      </Link>
    </Menu.Item>

    <Menu.Item key="2">
      <Link
        to={`/dashboard/order-management/order-details/edit-services/${id}`}
      >
        Edit Services
      </Link>
    </Menu.Item>
    <Menu.Item onClick={() => setModal2Open(true)} key="3">
      Edit Schedule
    </Menu.Item>
    {/* <Menu.Item key="4">Set Order On Hold</Menu.Item> */}
    <Menu.Item key="5" onClick={() => setRemoveModalOpen(true)}>
      Remove Order
    </Menu.Item>
    {/* <Menu.Item key="6">Cancel Order</Menu.Item> */}
  </Menu>
);

export { columns, menu };

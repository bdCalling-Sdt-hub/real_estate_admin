import React from "react";
import { Table } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Report = () => {
  // Data for Order Per Packages
  const orderPerPackagesData = [
    { key: "1", slNo: "#123", packageName: "VIP Packages", totalOrder: 246 },
    {
      key: "2",
      slNo: "#123",
      packageName: "Premium Packages",
      totalOrder: 567,
    },
    {
      key: "3",
      slNo: "#123",
      packageName: "Popular Packages",
      totalOrder: 345,
    },
  ];

  const orderPerPackagesColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Package Name", dataIndex: "packageName", key: "packageName" },
    { title: "Total Order", dataIndex: "totalOrder", key: "totalOrder" },
  ];

  // Data for Order Per Services
  const orderPerServicesData = [
    { key: "1", slNo: "#123", serviceName: "Drone Photo", totalOrder: 246 },
    { key: "2", slNo: "#123", serviceName: "Twilight Photo", totalOrder: 567 },
    { key: "3", slNo: "#123", serviceName: "Cinematic Video", totalOrder: 345 },
  ];

  const orderPerServicesColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Total Order", dataIndex: "totalOrder", key: "totalOrder" },
  ];

  // Data for Clients Report
  const clientsReportData = [
    {
      key: "1",
      slNo: "#123",
      companyName: "Louis Vuitton",
      phoneNumber: "(201) 555-0124",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      totalOrder: 246,
      revenue: "$5780",
    },
    {
      key: "2",
      slNo: "#123",
      companyName: "Bank of America",
      phoneNumber: "(219) 555-0114",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      totalOrder: 567,
      revenue: "$2325",
    },
    {
      key: "3",
      slNo: "#123",
      companyName: "Sony",
      phoneNumber: "(316) 555-0116",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      totalOrder: 345,
      revenue: "$3450",
    },
  ];

  const clientsReportColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Company/Client", dataIndex: "companyName", key: "companyName" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Total Order", dataIndex: "totalOrder", key: "totalOrder" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
  ];

  // Data for Team Members Report
  const teamMembersData = [
    {
      key: "1",
      slNo: "#123",
      name: "Annette Black",
      role: "Photographer",
      email: "xterris@gmail.com",
      phoneNumber: "(201) 555-0124",
      totalAppointment: 246,
    },
    {
      key: "2",
      slNo: "#123",
      name: "Jerome Bell",
      role: "Photo Editor",
      email: "bockely@att.com",
      phoneNumber: "(219) 555-0114",
      totalAppointment: 567,
    },
    {
      key: "3",
      slNo: "#123",
      name: "Albert Flores",
      role: "Video Editor",
      email: "qamaho@mail.com",
      phoneNumber: "(316) 555-0116",
      totalAppointment: 345,
    },
  ];

  const teamMembersColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Team-member", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Total Appointment",
      dataIndex: "totalAppointment",
      key: "totalAppointment",
    },
  ];
  const navigate = useNavigate()

  return (
    <div className=" ">
        <div className="bg-white p-4 mb-3">
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
                  <button className="text-[#EF4849]">
                    <FaArrowLeft />
                  </button>
                  <span className="text-lg font-semibold">Report</span>
                </h1>
        </div>
      {/* Order Per Packages */}
      <div className="grid grid-cols-2 gap-4 mb-3">
      <div className=" bg-white p-3">
        <h3 className="text-lg font-semibold mb-4">Order Per Packages</h3>
        <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
          <Table
            dataSource={orderPerPackagesData}
            columns={orderPerPackagesColumns}
            pagination={false}
            bordered
          />
        </div>
      </div>

      {/* Order Per Services */}
      <div className=" bg-white p-3">
        <h3 className="text-lg font-semibold mb-4">Order Per Services</h3>
        <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
          <Table
            dataSource={orderPerServicesData}
            columns={orderPerServicesColumns}
            pagination={false}
            bordered
          />
        </div>
      </div>
      </div>

      {/* Clients Report */}
      <div className="mb-3 bg-white p-3">
        <h3 className="text-lg font-semibold mb-4">Clients Report</h3>
        <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
          <Table
            dataSource={clientsReportData}
            columns={clientsReportColumns}
            pagination={false}
            bordered
          />
        </div>
      </div>

      {/* Team Members Report */}
      <div className=" bg-white p-3">
        <h3 className="text-lg font-semibold mb-4">Team-members Report</h3>
        <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
          <Table
            dataSource={teamMembersData}
            columns={teamMembersColumns}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

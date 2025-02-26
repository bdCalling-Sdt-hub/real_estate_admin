import React from "react";
import { Table } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetClientReportQuery, useGetOrderParPackageQuery, useGetOrderParServicesQuery, useGetTeamMemberReportQuery } from "../redux/api/reportApi";

export const Report = () => {
  const {data:parPackageData} = useGetOrderParPackageQuery()
  const{data:parService}= useGetOrderParServicesQuery()
  const{data:clientReport } = useGetClientReportQuery()
  const {data:teamMemberReport} = useGetTeamMemberReportQuery()


  const orderPerPackagesData =
  parPackageData?.data?.map((parPackage, index) => ({
    key: index + 1, 
    slNo: `#${index + 1}`, 
    packageName: parPackage?.packageName, 
    totalOrders: parPackage?.totalOrders,
  })) || [];

  const orderPerServicesData =
  parService?.data?.map((parService, index) => ({
    key: index + 1, 
    slNo: `#${index + 1}`, 
    title: parService?.title, 
    totalOrders: parService?.totalOrders,
  })) || [];
 


  const clientReportData =
  clientReport?.data?.map((report, index) => ({
    key: index + 1, 
    slNo: `#${index + 1}`, 
    companyName: report?.companyName, 
    address: report?.address,
    totalOrders: report?.totalOrders,
    revenue: report?.revenue,
  })) || [];

  const teamMemberReportData =
  teamMemberReport?.data?.map((report, index) => ({
    key: index + 1, 
    slNo: `#${index + 1}`, 
    name: report?.name, 
    role: report?.role,
    email: report?.email,
    phoneNumber: report?.phoneNumber,
    totalAppointments: report?.totalAppointments
  })) || [];


  const orderPerPackagesColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Package Name", dataIndex: "packageName", key: "packageName" },
    { title: "Total Order", dataIndex: "totalOrders", key: "totalOrders" },
  ];

  const orderPerServicesColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Service Name", dataIndex: "title", key: "title" },
    { title: "Total Order", dataIndex: "totalOrders", key: "totalOrders" },
  ];


  const clientsReportColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Company/Client", dataIndex: "companyName", key: "companyName" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Total Order", dataIndex: "totalOrders", key: "totalOrders" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
  ];

 

  const teamMembersColumns = [
    { title: "SL No", dataIndex: "slNo", key: "slNo" },
    { title: "Team-member", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Total Appointment",
      dataIndex: "totalAppointments",
      key: "totalAppointments",
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
            dataSource={clientReportData}
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
            dataSource={teamMemberReportData}
            columns={teamMembersColumns}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

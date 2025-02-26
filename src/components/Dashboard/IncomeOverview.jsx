import React from "react";
import { Pagination, Table, Tag } from "antd";
import { useGetTodayOrderQuery } from "../../page/redux/api/dashboardApi";

export const IncomeOverview = () => {
  const { data: order, isLoading } = useGetTodayOrderQuery();

  // Handling loading state
  if (isLoading) return <div>Loading...</div>;

  // Transforming the API data into table data format
  const data = order?.data?.map((item) => ({
    key: item.order._id, // Using the order ID as the key
    orderId: `#${item.order._id.slice(0, 6)}`, // Shortened Order ID for display
    address: `${item.order?.address?.streetName} ${item?.order?.order?.address?.streetAddress}, ${item?.order?.address?.city}, ${item?.order?.address?.zipCode}`,
    services: item.totalTasks,
    appointments: new Date(item.order.schedule.date).toLocaleString(), // Formatting the date
    status: item.order.status,
  }));

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Appointments",
      dataIndex: "appointments",
      key: "appointments",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="pink" key={status}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 px-6 pt-3">Need to Deliver Today</h1>
      <div className="h-[400px] overflow-auto">
      <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      {/* <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={order?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
          
        </div> */}
    </div>
  );
};

export default IncomeOverview;

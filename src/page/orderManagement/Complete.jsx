import React from "react";
import { Table } from "antd";
import { columns } from "./constant";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";

export const Complete = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: 1,
    status: "Completed",
  });
  return (
    <Table
      dataSource={orders?.data?.data}
      columns={columns}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
      }}
      bordered
      style={{ marginTop: "20px" }}
    />
  );
};

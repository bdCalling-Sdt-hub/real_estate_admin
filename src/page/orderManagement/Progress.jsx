import React, { useState } from "react";
import { Table } from "antd";
import { columns } from "./constant";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";

export const Progress = ({ search }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: page,
    limit: pageSize,
    status: "In-Progress",
    searchTerm: search,
  });
  return (
    <Table
      dataSource={orders?.data?.data}
      columns={columns}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ["10"],
        onChange: (page) => {
          setPage(page);
        },
      }}
      bordered
      style={{ marginTop: "20px" }}
      loading={isLoading}
    />
  );
};

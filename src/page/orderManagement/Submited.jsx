import React, { useState } from "react";
import { Table } from "antd";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";
import { columns } from "./constant";

export const Submited = ({ search }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: page,
    limit: pageSize,
    status: "Submitted",
    searchTerm: search,
  });
  return (
    <Table
      dataSource={orders?.data?.data}
      columns={columns}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
      bordered
      style={{ marginTop: "20px" }}
      loading={isLoading}
    />
  );
};

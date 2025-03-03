import React, { useState } from "react";
import { Table } from "antd";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";
import { columns } from "./constant";

export const AllManage = ({ search }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: page,
    searchTerm: search,
  });

  return (
    <Table
      dataSource={orders?.data?.data}
      columns={columns}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: orders?.data?.meta?.total,
        onChange: (newPage) => {
          setPage(newPage);
        },
        showSizeChanger: false,
        showTotal: (total) => `Total ${total} items`,
      }}
      loading={isLoading}
      bordered
      style={{ marginTop: "20px" }}
    />
  );
};

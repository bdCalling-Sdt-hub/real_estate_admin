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
    <div className="">
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
        loading={isLoading}
        bordered
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

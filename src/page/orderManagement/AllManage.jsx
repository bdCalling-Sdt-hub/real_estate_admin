import React from "react";
import { Table } from "antd";
import { useGetAllOrdersQuery } from "../redux/api/ordersApi";
import { columns } from "./constant";

export const AllManage = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    page: 1,
  });

  return (
    <div className="">
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
    </div>
  );
};

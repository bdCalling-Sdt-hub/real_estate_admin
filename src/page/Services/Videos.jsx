import React from "react";
import { Table, Avatar, Tag, Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export const Videos = () => {
    const data = [
        {
          key: "1",
          slNo: "#1233",
          title: "Drone Photo",
          price: "$580",
          description: "Help clients visualize your listing and its surroundings...",
        },
        {
          key: "2",
          slNo: "#1233",
          title: "3D Matterport",
          price: "$635",
          description: "Our best-selling package featuring our top-rated services...",
        },
        {
          key: "3",
          slNo: "#1233",
          title: "Twilight Photos",
          price: "$1245",
          description: "Help clients visualize your listing and its surroundings...",
        },
        {
          key: "4",
          slNo: "#1233",
          title: "Drone Photo",
          price: "$455",
          description: "Our best-selling package featuring our top-rated services...",
        },
        {
          key: "5",
          slNo: "#1233",
          title: "3D Matterport",
          price: "$655",
          description: "Help clients visualize your listing and its surroundings...",
        },
        {
          key: "6",
          slNo: "#1233",
          title: "Twilight Photos",
          price: "$705",
          description: "Our best-selling package featuring our top-rated services...",
        },
      ];
    
      const columns = [
        {
          title: "SL No.",
          dataIndex: "slNo",
          key: "slNo",
          width: "10%",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          width: "20%",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          width: "10%",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          width: "40%",
        },
        {
              title: "Details",
              key: "details",
              render: () => (
                <button
                  onClick={() => setModal2Open1(true)}
                  shape="circle"
                  className="bg-[#2A216D] h-10 w-10 rounded text-white text-xl"
                >
                  <EyeOutlined />
                </button>
              ),
              width: "10%",
            },
            {
              title: "Action",
              key: "action",
              render: () => (
                <div>
                  <button
                    shape="circle"
                    className="bg-[#2A216D] mr-2 h-10 w-10 rounded text-white text-xl"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    shape="circle"
                    className="bg-[#D80027] h-10 w-10 rounded text-white text-xl"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ),
              align: "end",
              width: "20%",
            },
      ];
    

  return (
    <div className="">
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 7,
          showSizeChanger: true,
          pageSizeOptions: ["7", "10", "20"],
        }}
        bordered
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

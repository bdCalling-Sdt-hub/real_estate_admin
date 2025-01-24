import React from 'react';
import { Table, Avatar, Tag, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const Complete = () => {
    const data = [
        {
          key: '1',
          orderId: '#12333',
          orderDate: '12/04/24',
          company: { logo: 'https://i.pravatar.cc/40?img=1', name: 'Louis Vuitton' },
          address: '2464 Royal Ln. Mesa, New Jersey',
          services: 2,
          total: '$546',
          appointments: '12/04/24 at 3:00 pm',
          status: 'In Production',
          payment: 'Invoiced',
        },
        {
          key: '2',
          orderId: '#12333',
          orderDate: '12/04/24',
          company: { logo: 'https://i.pravatar.cc/40?img=2', name: 'Bank of America' },
          address: '3517 W. Gray St. Utica, Pennsylvania',
          services: 6,
          total: '$783',
          appointments: '08/04/24 at 5:00 pm',
          status: 'Delivered',
          payment: 'Unpaid',
        },
        {
            key: '2',
            orderId: '#12333',
            orderDate: '12/04/24',
            company: { logo: 'https://i.pravatar.cc/40?img=2', name: 'Bank of America' },
            address: '3517 W. Gray St. Utica, Pennsylvania',
            services: 6,
            total: '$783',
            appointments: '08/04/24 at 5:00 pm',
            status: 'Delivered',
            payment: 'Unpaid',
          },
          {
            key: '3',
            orderId: '#12333',
            orderDate: '12/04/24',
            company: { logo: 'https://i.pravatar.cc/40?img=2', name: 'Bank of America' },
            address: '3517 W. Gray St. Utica, Pennsylvania',
            services: 6,
            total: '$783',
            appointments: '08/04/24 at 5:00 pm',
            status: 'Delivered',
            payment: 'Unpaid',
          },
          {
            key: '4',
            orderId: '#12333',
            orderDate: '12/04/24',
            company: { logo: 'https://i.pravatar.cc/40?img=2', name: 'Bank of America' },
            address: '3517 W. Gray St. Utica, Pennsylvania',
            services: 6,
            total: '$783',
            appointments: '08/04/24 at 5:00 pm',
            status: 'Delivered',
            payment: 'Unpaid',
          },
        // Add more rows as necessary for pagination
      ];
    
      const columns = [
        {
          title: 'Order ID',
          dataIndex: 'orderId',
          key: 'orderId',
          width: '10%',
        },
        {
          title: 'Order Date',
          dataIndex: 'orderDate',
          key: 'orderDate',
          width: '10%',
        },
        {
          title: 'Company/Client',
          dataIndex: 'company',
          key: 'company',
          render: (company) => (
            <div className="flex items-center">
              <Avatar src={company.logo} alt={company.name} />
              <span style={{ marginLeft: 8 }}>{company.name}</span>
            </div>
          ),
          width: '20%',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          width: '20%',
        },
        {
          title: 'Services',
          dataIndex: 'services',
          key: 'services',
          width: '8%',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          width: '8%',
        },
        {
          title: 'Appointments',
          dataIndex: 'appointments',
          key: 'appointments',
          width: '15%',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            let color = status === 'In Production' ? 'purple' : status === 'Delivered' ? 'green' : 'red';
            return <Tag color={color}>{status}</Tag>;
          },
          width: '10%',
        },
        {
          title: 'Payment',
          dataIndex: 'payment',
          key: 'payment',
          render: (payment) => {
            let color = payment === 'Paid' ? 'green' : payment === 'Unpaid' ? 'red' : 'yellow';
            return <Tag color={color}>{payment}</Tag>;
          },
          width: '10%',
        },
        {
          title: "Details",
          key: "details",
          render: () => (
           <Link to={'/dashboard/order-management/order-details'}> <button
           
           
           className="w-10 h-10 text-white bg-[#2A216D] rounded text-xl"
         ><EyeOutlined /></button></Link>
          ),
          width: "5%",
        },
      ];
    
  return (
    <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 5, 
          showSizeChanger: true, 
          pageSizeOptions: ['5', '10', '20'], 
        }}
        bordered
        style={{ marginTop: '20px' }}
      />
  )
}

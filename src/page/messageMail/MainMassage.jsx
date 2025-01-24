import React from 'react';
import { Table, Avatar, Button } from 'antd';
import { DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const MainMassage = () => {
  const data = [
    {
      key: '1',
      sender: {
        name: 'Albert Mike',
        avatar: 'https://via.placeholder.com/20',
      },
      subject: 'Request For Information',
      preview: 'I hope you are doing well. I have a small request. Can you pleas...',
      time: '1:45 AM',
      starred: true,
    },
    {
      key: '2',
      sender: {
        name: 'Leslie Alexander',
        avatar: 'https://via.placeholder.com/20',
      },
      subject: 'Invitation For Meeting',
      preview: 'Good Morning, I hope this email finds you well. I am writing to ext...',
      time: '3:34 AM',
      starred: false,
    },
    {
      key: '3',
      sender: {
        name: 'Bessie Cooper',
        avatar: 'https://via.placeholder.com/20',
      },
      subject: 'Holiday Notice',
      preview: 'Good Evening, I hope you are doing well. I have a small request. Can you p...',
      time: 'Apr 2',
      starred: false,
    },
    {
      key: '4',
      sender: {
        name: 'Cody Fisher',
        avatar: 'https://via.placeholder.com/20',
      },
      subject: 'Offer Letter',
      preview: 'Thank you for applying. I hope you are doing well. I have a small request. Can...',
      time: 'Mar 31',
      starred: true,
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'starred',
      key: 'starred',
      render: (starred) => (
        starred ? <StarFilled  style={{ color: '#FFD700' }} /> : <StarOutlined style={{ color: '#d9d9d9' }} />
      ),
      width: '5%',
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
      render: (sender) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={sender.avatar} alt={sender.name} style={{ marginRight: '10px' }} />
          <Link to={`/dashboard/message-mail/user-details`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {sender.name}
          </Link>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => (
        <div>
          <strong>{text}</strong> - {record.preview}
        </div>
      ),
      width: '50%',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <button
          
          className=''
        ><DeleteOutlined /></button>
      ),
      width: '5%',
    },
  ];

  return (
    <div className='bg-white p-4 h-screen'>
      <h1 className='text-lg font-semibold mb-4'>Inbox</h1>
      <div style={{ overflowX: 'auto', maxHeight: '75vh', overflowY: 'auto' }}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};
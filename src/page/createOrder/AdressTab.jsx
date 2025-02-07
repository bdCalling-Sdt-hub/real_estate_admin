import React from 'react';
import { Form, Input, Radio, Typography } from 'antd';

export const AdressTab = () => {
  return (
    <div className='pb-11'style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <Typography.Title level={3}>Address</Typography.Title>
      <Form layout="vertical">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            label="Zip Code"
            name="zipCode"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please input your zip code!' }]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
          <Form.Item
            label="Street Number"
            name="streetNumber"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please input your street number!' }]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
        </div>

        <Form.Item
          label="Street Address"
          name="streetAddress"
          rules={[{ required: true, message: 'Please input your street address!' }]}
        >
          <Input placeholder="Input here" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Form.Item
            label="City"
            name="city"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Input placeholder="Input here" />
          </Form.Item>
          
        </div>

        <Form.Item label="Pickup keys at real estate office?" name="pickupKeys">
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

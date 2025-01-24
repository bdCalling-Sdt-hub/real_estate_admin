import { Select, Tooltip } from 'antd';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const items = [
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
];

const chartData = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 2210, amt: 2290 },
  { name: 'Mar', uv: 200, pv: 2290, amt: 2000 },
  { name: 'Apr', uv: 278, pv: 2000, amt: 2181 },
  { name: 'May', uv: 189, pv: 2181, amt: 2500 },
  { name: 'Jun', uv: 239, pv: 2500, amt: 2100 },
  { name: 'Jul', uv: 349, pv: 2100, amt: 2300 },
  { name: 'Aug', uv: 300, pv: 2400, amt: 2200 },
  { name: 'Sep', uv: 320, pv: 2600, amt: 2800 },
  { name: 'Oct', uv: 450, pv: 2900, amt: 3000 },
  { name: 'Nov', uv: 400, pv: 3000, amt: 3100 },
  { name: 'Dec', uv: 500, pv: 3200, amt: 3400 },
];

export const OrderTrends = () => {
  return (
    <div>
    <div className="flex justify-between p-3 px-7">
      <p className="text-xl font-medium">Order Trends</p>
      <Select
        defaultValue="2024"
        style={{ width: 120 }}
        options={items}
      />
    </div>
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={500}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={13}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="uv"
            stackId="a"
            fill="#2A216D"
            radius={[25, 25, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  )
}

import { Select, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUserGrowthQuery } from "../../page/redux/api/dashboardApi";

const items = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];

export const OrderTrends = () => {
  const [year, setSelectedYear] = useState("2025");

  // সঠিকভাবে API-তে year পাঠানো হচ্ছে
  const { data: growth, isLoading } = useGetUserGrowthQuery(year);

  // Year চেঞ্জ হ্যান্ডেল করার সঠিক উপায়
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  // API ডাটা প্রসেস করে চার্টের জন্য প্রস্তুত করা
  const chartData = useMemo(() => {
    if (!growth || !growth.data) return [];

    return growth.data.data.map((item) => ({
      name: item.month,
      uv: item.count,
    }));
  }, [growth]);

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between p-3 px-7">
        <p className="text-xl font-medium">Order Trends</p>
        <Select
          defaultValue={year}
          onChange={handleYearChange}
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" stackId="a" fill="#2A216D" radius={[25, 25, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

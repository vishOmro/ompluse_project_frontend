"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// JSON Data
import { deliverydata } from "@/app/data/deliveryreport.js";

const Graph = () => {
  // Group data by type
  const groupedData = deliverydata.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  // Convert to array for Recharts
  const chartData = Object.entries(groupedData).map(([key, value]) => ({
    type: key,
    count: value,
  }));

  return (
    <div className="p-6 text-sm">
      <h2 className=" font-bold text-center mb-4">
        Message Types Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="type" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Message Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;

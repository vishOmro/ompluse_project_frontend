"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Predefined data
const reportData = [
  { name: "Rejected", value: 36, color: "#FF6384" },
  { name: "Submitted", value: 38, color: "#36A2EB" },
  { name: "Awaited", value: 25, color: "#FFCE56" },
];

const PieChartComponent = () => {
  return (
    <div className="p-6">
      <h2 className="text-sm font-bold text-center mb-4">Predefined Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={reportData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {reportData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;

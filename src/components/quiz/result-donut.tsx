"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import React from "react";

type ResultsDonutProps = {
  correct: number;
  incorrect: number;
};

export default function ResultsDonut({ correct, incorrect }: ResultsDonutProps) {
  const data = [
    { name: "Correct", value: correct, color: "#10b981" },
    { name: "Incorrect", value: incorrect, color: "#ef4444" },
  ];

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            strokeWidth={0}
            isAnimationActive
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

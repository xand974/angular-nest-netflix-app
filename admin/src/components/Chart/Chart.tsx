import "./chart.scss";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { data } from "mockData";

type ChartType = {
  grid?: boolean;
};
export default function Chart({ grid }: ChartType) {
  return (
    <div className="chart">
      <h2 className="title">User Analystics</h2>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <Line type="monotone" dataKey="connected" color="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

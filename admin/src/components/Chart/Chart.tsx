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
import { useEffect, useState, useRef } from "react";
import { AnalyticsService } from "../../services/analytic.service";
import { MONTHS_MOCK } from "mockData";

type ChartType = {
  grid?: boolean;
};

type FormatAnalytic = {
  name: string;
  total: number;
};
export default function Chart({ grid }: ChartType) {
  const [timeline, setTimeline] = useState([] as FormatAnalytic[]);
  const analyticsService = useRef(new AnalyticsService());
  const MONTHS = useRef(MONTHS_MOCK);
  useEffect(() => {
    const getTimeline = async () => {
      const res = await analyticsService.current.getUsersTimeline();
      const formatted = res.map((item) => ({
        total: item.total,
        name: MONTHS.current[item._id],
      })) as FormatAnalytic[];

      setTimeline([...formatted]);
    };
    getTimeline();
  }, [MONTHS]);

  return (
    <div className="chart">
      <h2 className="title">User Analytics</h2>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={timeline}>
          <XAxis dataKey="name" />
          <Line type="monotone" dataKey="total" color="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

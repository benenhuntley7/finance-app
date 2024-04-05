"use client";
import { PureComponent } from "react";
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const data2 = [
  {
    name: "Page A",
    uv: 6000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

export class NewBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={350} height={250}>
        <BarChart width={350} height={250} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#000000" />
          <Bar dataKey="uv" fill="#aaaaaa" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export interface ShareHistoryProps {
  date: string;
  high: number | null;
  low: number | null;
}

export class NewLineChart extends PureComponent<{ data: ShareHistoryProps[] }> {
  render() {
    const { data } = this.props;

    // Initialize variables to store lowest low and highest high
    let lowestLow = Infinity;
    let highestHigh = -Infinity;

    // Iterate through the data to find the lowest low and highest high
    data.forEach((item) => {
      if (item.low! < lowestLow) {
        lowestLow = item.low!;
      }
      if (item.high! > highestHigh) {
        highestHigh = item.high!;
      }
    });

    lowestLow = lowestLow - lowestLow * 0.05;
    highestHigh *= 1.05;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={350} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} domain={[lowestLow, highestHigh]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#000000" activeDot={{ r: 4 }} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="low" stroke="#aaaaaa" activeDot={{ r: 4 }} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default { NewBarChart, NewLineChart };

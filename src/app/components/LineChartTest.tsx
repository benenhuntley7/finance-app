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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export class NewBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={350} height={250}>
        <BarChart width={350} height={250} data={data}>
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

export class NewLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={350} height={250}>
        <LineChart width={350} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#000000" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="uv" stroke="#aaaaaa" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default { NewBarChart, NewLineChart };

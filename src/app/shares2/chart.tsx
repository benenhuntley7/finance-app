"use client";

import { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface ShareHistoryProps {
  date: string;
  value: number | null;
}

export default class SharePortfolioChart extends PureComponent<{ data: ShareHistoryProps[] }> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={350} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} domain={[0, 1]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#000000" activeDot={{ r: 4 }} dot={{ r: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

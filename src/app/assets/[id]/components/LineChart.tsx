"use client";

import { PureComponent } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export interface Props {
  id: number;
  value: number | null;
  updated_at: Date | null;
}

export default class AssetValueChart extends PureComponent<{ data: Props[] }> {
  render() {
    const { data } = this.props;
    const reversedData = [...data].reverse();

    const localizedData = reversedData.map((item) => {
      // Convert the Date object to a local date string
      const localDateString = new Date(item.updated_at!).toLocaleDateString();

      // Return a new object with updated_at property set to local date string
      return {
        ...item,
        updated_at: localDateString,
      };
    });

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={350}
          height={250}
          data={localizedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="updated_at" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

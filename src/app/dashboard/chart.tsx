"use client";
import React from "react";
import { PureComponent } from "react";
// import { PureComponent } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { category } from "./functions";

// format data so that only one category is displayed on the chart
export default class AssetChart extends PureComponent<{ data: category[] }> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width={"100%"} height={400}>
        <RadarChart outerRadius={100} width={350} height={350} data={data}>
          <PolarGrid />
          <PolarRadiusAxis  domain={[0, 15]} />
          <PolarAngleAxis hide dataKey={"category"} />
          <Radar
            dataKey="value"
            stroke="#1b625c"
            fill="#1b625c"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

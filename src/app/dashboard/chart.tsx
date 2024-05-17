"use client";
import React from "react";
import { PureComponent } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Radar,
  Legend,
  XAxis,
  YAxis,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  Brush,
  CartesianGrid,
  Tooltip,
  Bar,
  Customized,
  BarChart,
} from "recharts";
import { Category } from "./functions";
import { AssetOutput } from "../assets/functions";

// format data so that only one category is displayed on the chart
export default class AssetChart extends PureComponent<{ data: Category[] }> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width={"100%"} height={200}>
        <BarChart width={350} height={250} data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" fill="#ccc" /> */}
          <XAxis dataKey="category" />
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#94B0DA" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

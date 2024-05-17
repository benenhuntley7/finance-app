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
  BarChart

} from "recharts";
import { Category } from "./functions";
import { AssetOutput } from "../assets/functions";

// format data so that only one category is displayed on the chart
export default class AssetChart extends PureComponent<{ data: Category[] }> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width={"100%"} height={250}>
        {/* <RadarChart outerRadius={100} width={350} height={350} data={data}>
          <PolarGrid />
          <PolarAngleAxis hide dataKey={"category"} />
          <Radar
            dataKey="value"
            stroke="#1b625c"
            fill="#1b625c"
            fillOpacity={0.4}
          />
        </RadarChart> */}
        {/* <PieChart width={100} height={100}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            
          />
        
        </PieChart> */}
        <BarChart width={350} height={250} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" fill="#ccc" /> */}
          <XAxis dataKey="category" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#94B0DA" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

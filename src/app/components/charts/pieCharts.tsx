"use client"
import { PureComponent } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

const data = [
  {
    subject: "Property",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Vehicle",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Jewelry",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Tech",
    A: 99,
    B: 100,
    fullMark: 150,
  },
];


export const NewPieChart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
    <RadarChart outerRadius={90} width={730} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name="Lily"
        dataKey="B"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
   </ResponsiveContainer>
  )
}

export default  NewPieChart 

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
  Legend,
  Tooltip,
  RadialBar,
  Customized,
  RadialBarChart,
} from "recharts";
import { formatValues } from "./functions";

export interface Asset {
  assets: {
    id: number;
    name: string | null;
    user_id: string | null;
    category: string | null;
  };
  asset_values_history?: {
    id: number;
    updated_at: string | null;
    asset_id: number;
    value: number | null;
  };
}

// format data so that only one category is displayed on the chart
export default class AssetChart extends PureComponent<{ data: Asset[] }> {
  render() {
    const { data } = this.props;

    const formattedData = (data as any[]).reduce((result, item) => {
      const existingCategoryIndex = result.findIndex(
        (entry: any) => entry.category === item.assets.category
      );

      if (existingCategoryIndex !== -1) {
        // Category already exists, add the value to its accumulated value
        result[existingCategoryIndex].value +=
          item.asset_values_history?.value || 0;
      } else {
        // New category, add it to the result
        result.push({
          category: item.assets.category,
          value: formatValues(item.asset_values_history?.value || 0),
        });
      }
      console.log(result);
      return result;
    }, []);

    return (
      <ResponsiveContainer width={"100%"} height={400}>
        <RadarChart
          outerRadius={90}
          width={730}
          height={250}
          data={formattedData}
        >
          <PolarGrid />

          <PolarAngleAxis dataKey={"category"} />

          {/* <PolarRadiusAxis angle={10} domain={[0, 10]} allowDataOverflow /> */}
          <Radar
            dataKey="value"
            stroke="#8f91a2"
            fill="#8f91a2"
            fillOpacity={0.6}
          />
          {/* <Legend /> */}
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

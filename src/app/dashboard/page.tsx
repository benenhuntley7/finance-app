"use client";
import { NewBarChart } from "../components/charts/LineChartTest";
import { NewPieChart } from "../components/charts/pieCharts";
import AssetChart from "./chart";
import { useState, useEffect } from "react";
import { getAsset } from "./actions";
import { fetchData } from "./functions";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchData();
        if (data !== undefined) {
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="flex align-center justify-center">
          <AssetChart data={data} />
        </div>
      </div>
    </>
  );
}

"use client";
import AssetChart from "./chart";
import { useState, useEffect } from "react";
import { fetchData } from "./functions";
import { formattedData } from "./functions";
import { category } from "./functions";

export default function Dashboard() {
  const [data, setData] = useState<category[]>([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchData();
        if (data !== undefined) {
          const formatted = formattedData(data)
          setData(formatted);
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
          <div className="w-full flex align-center justify-center lg:w-1/4">
            <AssetChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

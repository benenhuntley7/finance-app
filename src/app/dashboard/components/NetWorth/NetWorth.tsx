import React from "react";
import "./style.css";
import { formatCurrency } from "@/app/functions/currency";

interface totalIncome {
    netWorth: number | null;
}

const NetWorth: React.FC<totalIncome> = ({ netWorth }) => {
    return (
        <div className=" netWorth-container w-full flex items-center ">
        <h1 className="block uppercase tracking-widest text-black font-semibold text-xs">
          Net Worth:
        </h1>
        <p className="text-2xl text-[#00f71d] ml-auto tracking-widest">
          {formatCurrency(netWorth)}
        </p>
      </div>
    )
}

export default NetWorth
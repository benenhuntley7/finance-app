import React from "react";
import { formatCurrency } from "@/app/functions/currency";

interface totalIncome {
    netWorth: number | null;
}

const NetWorth: React.FC<totalIncome> = ({ netWorth }) => {
    return (
        <div className="w-full flex items-center lg:w-1/2">
        <h1 className="block  border-b uppercase tracking-wide text-slate-400 text-xs font-bold">
          Net Worth:
        </h1>
        <p className="text-2xl text-green-400 ml-auto">
          {formatCurrency(netWorth)}
        </p>
      </div>
    )
}

export default NetWorth
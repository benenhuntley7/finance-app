import React from "react";
import { formatCurrency } from "@/app/functions/currency";

interface totalIncome {
    netWorth: number | null;
}

const NetWorth: React.FC<totalIncome> = ({ netWorth }) => {
    return (
        <div className="w-full flex items-center lg:w-1/2">
        <h1 className="block uppercase tracking-widest text-white text-xs">
          Net Worth:
        </h1>
        <p className="text-2xl text-[#5DB85B] ml-auto tracking-widest">
          {formatCurrency(netWorth)}
        </p>
      </div>
    )
}

export default NetWorth
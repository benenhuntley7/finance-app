"use client";

import { useState } from "react";
import { getShare } from "./actions";

interface Share {
  symbol: string;
  longName: string | undefined;
  regularMarketPrice: number | undefined;
}

export default function Shares() {
  const [share, setShare] = useState<Share | null>(null);
  const [buttonText, setButtonText] = useState("Search");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShare(null);
    setButtonText("Searching...");

    const symbolInput = document.getElementById("share-id") as HTMLInputElement;
    const symbol = symbolInput.value + ".AX";

    const result = await getShare(symbol);

    if (result) setShare(result);

    setButtonText("Search");
  };

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <h1>Shares</h1>
      <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
              ASX Symbol:
            </label>
            <input
              className={inputClass}
              type="text"
              id="share-id"
              name="share-id"
              style={{ textTransform: "uppercase" }}
              pattern="[A-Za-z0-9]{1,4}"
              maxLength={4}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
              Last Name
            </label>
            <button className="btn btn-outline btn-primary">{buttonText}</button>
          </div>
        </div>
      </form>
      {share && (
        <div>
          <p>Symbol: {share.symbol}</p>
          <p>Share Name: {share.longName}</p>
          <p>Current Price: ${share.regularMarketPrice}</p>
        </div>
      )}
    </main>
  );
}

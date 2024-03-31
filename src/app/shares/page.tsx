"use client";

import { useState } from "react";
import { getShare, getShareList } from "./actions";

interface SharePrice {
  symbol: string;
  longName: string | undefined;
  regularMarketPrice: number | undefined;
}

interface ShareSearchResults {
  symbol: string | null;
  row_id: number | null;
  longName: string | null;
}

export default function Shares() {
  const [share, setShare] = useState<SharePrice | null>(null);
  const [buttonText, setButtonText] = useState("Search");
  const [searchResults, setSearchResults] = useState<ShareSearchResults[] | null>(null);

  const searchShareList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchStringElement = document.getElementById("share-id") as HTMLInputElement;
    const searchString = searchStringElement.value;

    if (searchString.length) {
      const shareList = await getShareList(searchString);
      setSearchResults(shareList);
    } else {
      setSearchResults(null);
    }
  };

  const handleOptionClick = (symbol: string) => {
    const symbolInput = document.getElementById("share-id") as HTMLInputElement;
    const symbolWithoutPeriod = symbol.substring(0, symbol.indexOf("."));
    symbolInput.value = symbolWithoutPeriod;
    setSearchResults(null);
  };

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
          <div>
            <input
              className={inputClass}
              type="text"
              id="share-id"
              name="share-id"
              style={{ textTransform: "uppercase" }}
              pattern="[A-Za-z0-9]{1,4}"
              maxLength={4}
              onChange={searchShareList}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <button className="btn btn-outline btn-primary">{buttonText}</button>
          </div>
          {searchResults && searchResults.length > 0 && (
            <p id="share-options" className="z-50 border border-neutral-500 px-5">
              {searchResults.map((result, index) => (
                <option key={index} value={result.symbol || ""} onClick={() => handleOptionClick(result.symbol || "")}>
                  {result.symbol}: {result.longName}
                </option>
              ))}
            </p>
          )}
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

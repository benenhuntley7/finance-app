"use client";

import { useState, useEffect } from "react";
import { getShare, getShareList } from "./actions";
import { DividendHistory, getShareHistory } from "@/server/api/yahooFinance";
import { NewLineChart, ShareHistoryProps } from "../components/LineChartTest";

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
  const [searchString, setSearchString] = useState("");
  const [shareHistory, setShareHistory] = useState<ShareHistoryProps[] | null>(null);
  const [dividendHistory, setDividendHistory] = useState<DividendHistory[] | null>();

  const handleClick = async (symbol: string) => {
    setShare(null);
    setSearchResults(null);
    setShareHistory(null);
    setDividendHistory(null);

    setButtonText("Searching...");
    const result = await getShare(symbol);

    if (result) {
      setShare(result);

      const { priceHistory, dividendHistory } = await getShareHistory(symbol);

      if (priceHistory) setShareHistory(priceHistory);
      if (dividendHistory) setDividendHistory(dividendHistory);

      setSearchString("");
    }

    setButtonText("Search");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleClick(searchString + ".AX");
  };

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  // useEffect with 300ms timeout to prevent rapid searches due to typing into input box
  useEffect(() => {
    const fetchData = async () => {
      if (searchString.length) {
        const shareList = await getShareList(searchString);
        setSearchResults(shareList);
      } else {
        setSearchResults(null);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300); // Debounce time in milliseconds

    return () => clearTimeout(debounceTimer);
  }, [searchString]);

  return (
    <main className="flex flex-col items-center justify-between p-3 relative">
      <h1 className="text-neutral-800 font-semibold text-lg">Share Search</h1>
      <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
        <div className="flex mb-6">
          <div className="w-2/3">
            <input
              className={inputClass}
              type="text"
              id="share-search"
              name="share-search"
              value={searchString}
              style={{ textTransform: "uppercase" }}
              pattern="[A-Za-z0-9]{1,4}"
              maxLength={4}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
          </div>
          <div className="w-1/3">
            <div className="ms-4">
              <button className="btn btn-outline btn-primary min-w-full">{buttonText}</button>
            </div>
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className="absolute top-36 max-w-full md:w-1/2 md:max-w-lg cursor-pointer bg-white z-50">
              <p id="share-options" className="z-50 border border-neutral-500 text-sm md:text-base truncate pb-5">
                {searchResults.slice(0, 10).map((result, index) => (
                  <option
                    key={index}
                    value={result.symbol || ""}
                    onClick={() => handleClick(result.symbol || "")}
                    className=" hover:bg-neutral-300"
                  >
                    {result.symbol!.split(".")[0].toUpperCase()}: {result.longName}
                  </option>
                ))}
              </p>
            </div>
          )}
        </div>
      </form>
      {share && (
        <>
          <div className="flex justify-between max-w-lg w-full text-sm md:text-base items-center">
            <table className="table">
              <thead>
                <th>Symbol</th>
                <th>Description</th>
                <th>Current Price</th>
              </thead>
              <tbody>
                <td>{share.symbol.split(".")[0].toUpperCase()}</td>
                <td>{share.longName}</td>
                <td>${share.regularMarketPrice?.toFixed(2)}</td>
                <td>
                  <label className="btn btn-outline btn-sm ms-4">Add</label>
                </td>
              </tbody>
            </table>
          </div>
          <div className="w-full lg:w-1/2 h-48 md:h-72 mt-5">
            <NewLineChart data={shareHistory || []} />
          </div>
        </>
      )}
      {dividendHistory && dividendHistory.length > 0 && (
        <>
          <div className="flex flex-col max-w-lg w-full text-sm md:text-base items-center mt-5">
            <p>Dividend History</p>
            <table className="table">
              <thead>
                <th>Date</th>
                <th>Dividend Amount</th>
              </thead>
              <tbody>
                {dividendHistory.map((d, index) => (
                  <tr key={index}>
                    <td>{d.date}</td>
                    <td>${d.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

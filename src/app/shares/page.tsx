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
  const [dividendHistory, setDividendHistory] = useState<any>();

  const handleClick = async (symbol: string) => {
    setShare(null);
    setSearchResults(null);
    setButtonText("Searching...");
    const result = await getShare(symbol);

    if (result) {
      setShare(result);

      const { priceHistory, dividendHistory } = await getShareHistory(symbol);

      if (history) {
        setShareHistory(priceHistory);
        setDividendHistory(dividendHistory);
      }

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
    <main className="flex flex-col items-center justify-between p-10 relative">
      <h1>Shares</h1>
      <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6">
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
            <div className="absolute top-36 max-w-full w-1/2 md:max-w-lg cursor-pointer bg-white z-50">
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
          <div className="flex justify-between  max-w-lg w-full text-sm md:text-base items-center">
            <p className="">
              {share.symbol.split(".")[0].toUpperCase()}: {share.longName} - ${share.regularMarketPrice}
            </p>
            <label className="btn btn-outline btn-sm md:btn-md ms-4">Add</label>
          </div>
          <div className="w-full md:w-1/2 h-48 md:h-72 mt-5">
            <NewLineChart data={shareHistory || []} />
          </div>
        </>
      )}
      {dividendHistory && (
        <>
          <div className="flex justify-between  max-w-lg w-full text-sm md:text-base items-center">
            {dividendHistory.map((dividend: any) => {
              <p>{dividend.date}</p>;
            })}
          </div>
        </>
      )}
    </main>
  );
}

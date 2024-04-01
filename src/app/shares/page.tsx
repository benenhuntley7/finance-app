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

  const handleOptionClick = async (symbol: string) => {
    setSearchResults(null);
    setShare(null);
    setButtonText("Searching...");

    const symbolInput = document.getElementById("share-id") as HTMLInputElement;
    const symbolWithoutPeriod = symbol.substring(0, symbol.indexOf("."));
    symbolInput.value = symbolWithoutPeriod;
    const symbol2 = symbolInput.value + ".AX";

    const result = await getShare(symbol2);

    if (result) setShare(result);

    setButtonText("Search");
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
        <div className="flex flex-wrap mb-6">
          <div className="w-2/3">
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
          <div className="w-1/3">
            <div className="ms-4">
              <button className="btn btn-outline btn-primary min-w-full">{buttonText}</button>
            </div>
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className="min-w-full max-w-full md:max-w-lg cursor-pointer">
              <p id="share-options" className="z-50 border border-neutral-500 mx-1 text-sm md:text-base truncate">
                {searchResults.slice(0, 10).map((result, index) => (
                  <option
                    key={index}
                    value={result.symbol || ""}
                    onClick={() => handleOptionClick(result.symbol || "")}
                    className=" hover:bg-neutral-300"
                  >
                    {result.symbol}: {result.longName}
                  </option>
                ))}
              </p>
            </div>
          )}
        </div>
      </form>
      {share && (
        <div className="flex justify-between  max-w-lg w-full text-sm md:text-base items-center">
          <p className="">
            {share.symbol.toUpperCase()}: {share.longName} - ${share.regularMarketPrice}
          </p>
          <label className="btn btn-outline btn-sm md:btn-md ms-4">Add</label>
        </div>
      )}
    </main>
  );
}

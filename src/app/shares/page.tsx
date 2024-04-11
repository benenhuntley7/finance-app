"use client";

import { useState, useEffect } from "react";
import { getShare, getShareList, getSharePurchases } from "./actions";
import { DividendHistory, getShareHistory } from "@/server/api/yahooFinance";
import { NewLineChart } from "../components/LineChartTest";
import AddShareForm from "./form";
import SharePurchases from "./SharePurchases";

export interface ShareHistoryProps {
  date: string;
  high: number | null;
  low: number | null;
}

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
    <main className="flex flex-col items-center justify-between relative lg:px-20">
      <h1 className="text-neutral-800 font-semibold text-lg mt-3">Share Search</h1>
      <div className=" border-b border-neutral-500 min-w-full flex justify-center mb-5 py-3">
        <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
          <div className="flex">
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
              <SearchResults searchResults={searchResults} handleClick={handleClick} />
            )}
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <SharePurchases />
      </div>
      {buttonText === "Searching..." ? (
        <div className="loading loading-spinner"></div>
      ) : (
        <>
          {share && <ShareResultInfo share={share} shareHistory={shareHistory} />}
          {share && dividendHistory && dividendHistory.length > 0 && (
            <DividendHistoryTable dividendHistory={dividendHistory} />
          )}
        </>
      )}
    </main>
  );
}

interface SearchResultsProps {
  searchResults: ShareSearchResults[];
  handleClick: (symbol: string) => void; // Add handleClick prop
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, handleClick }) => {
  return (
    <div className="absolute top-28  max-w-full w-11/12 md:w-1/2 md:max-w-lg cursor-pointer bg-white z-50">
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
  );
};

interface ShareResultInfoProps {
  share: SharePrice;
  shareHistory: ShareHistoryProps[] | null;
}

const ShareResultInfo: React.FC<ShareResultInfoProps> = ({ share, shareHistory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
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
              <label className="btn btn-outline btn-sm ms-4" onClick={toggleModal}>
                Add
              </label>
            </td>
          </tbody>
        </table>
      </div>

      {/* Render the modal conditionally based on the state */}
      {isModalOpen && (
        <AddShareForm toggleModal={toggleModal} currentPrice={share.regularMarketPrice || 0} symbol={share.symbol} />
      )}
      <div className="w-full lg:w-1/2 h-48 md:h-72 mt-5">
        <NewLineChart data={shareHistory || []} />
      </div>
    </>
  );
};

interface DividendHistoryProps {
  dividendHistory: DividendHistory[];
}

const DividendHistoryTable: React.FC<DividendHistoryProps> = ({ dividendHistory }) => {
  return (
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
  );
};

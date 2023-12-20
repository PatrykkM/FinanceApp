import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useParams, Link } from "react-router-dom";
import LineChart from "../../LineChart";
import { useSelector } from "react-redux";

import { data } from "../../Data";

const TradingPage = () => {
  const params = useParams();
  const apiData = useSelector((state) => state.apiData);
  const StockDataArray = apiData.find((data) =>
    data.find((innerData) => innerData.symbol === params.symbol)
  );
  const StockData = StockDataArray
    ? StockDataArray.find((innerData) => innerData.symbol === params.symbol)
    : undefined;
  const DayPercentageChange =
    StockData && StockData?.close && StockData?.preMarket
      ? (100 * (StockData?.close - StockData?.preMarket)) / StockData?.preMarket
      : 0;
  const [active, setActive] = useState(false);
  const stockData = data.find((stock) => stock.LinkStock === params.symbol);

  const handleWatchlist = () => {
    if (stockData) {
      stockData.Watchlist = !stockData.Watchlist;
    }

    setActive(!active);
  };
  const handleBuyStock = () => {
    stockData.Portfolio = stockData.Portfolio + 1;
  };
  const HandleSellStock = () => {
    setActive(!active);
    stockData.Portfolio = stockData.Portfolio - 1;
    if (stockData.Portfolio === -1) {
      stockData.Portfolio = 0;
    } else return;
  };

  const GraphStockData = [
    {
      id: 1,
      hour: "pre",
      Gain: StockData?.preMarket,
    },
    {
      id: 2,
      hour: "open",
      Gain: StockData?.open,
    },
    {
      id: 3,
      hour: "now",
      Gain: StockData?.close,
    },
  ];
  const [userData] = useState({
    labels: GraphStockData.map((data) => data.hour),
    datasets: [
      {
        data: GraphStockData.map((data) => data.Gain),
        borderColor: "#2366DC",
        borderWidth: 3,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        display: null,
      },
      y: {
        display: null,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    line: {},
  };
  const ClosePrice = StockData?.close;

  return (
    <div className="flex flex-col items-center justify-center font-Roboto min-w-314px overflow-hidden w-full  bg-Light-Black">
      <div className="w-full">
        <div className=" flex justify-between items-center  w-full text-3xl text-white pt-14 ">
          <Link to={"/FinanceApp"}>
            <div className="ml-3">
              <RiArrowLeftSLine />
            </div>
          </Link>

          <div className="font-light text-2xl tracking-wide">
            {StockData?.symbol}
          </div>
          <div className="mr-3" onClick={() => setActive(!active)}>
            <BiDotsVerticalRounded />
          </div>
        </div>
        <div className="flex flex-col justify-around items-center h-96 w-full text-white bg-Light-Black text-3xl">
          <div className="h-1/2 w-full mt-12 overflow-hidden">
            <LineChart chartData={userData} options={options} />
          </div>
          <div className="w-full ">
            <ul className=" flex justify-between mx-1 text-xs text-gray-500 font-medium">
              <li>Pre</li>
              <li>Open</li>
              <li>now</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center rounded-t-3xl bg-white ">
        <div className="flex flex-col w-11/12">
          <div className="flex mt-12">
            <div className="text-3xl font-medium ">
              ${ClosePrice.toFixed(2)}
            </div>
            {DayPercentageChange > 0 ? (
              <div className="flex justify-center items-center ml-3 text-xs w-14 h-6 bg-green-100 text-green-500 rounded-md mt-px">
                +{DayPercentageChange.toFixed(2)}%
              </div>
            ) : (
              <div className="flex justify-center items-center ml-3 text-xs w-14 h-6 bg-red-100 text-red-500 rounded-md mt-px">
                {DayPercentageChange.toFixed(2)}%
              </div>
            )}
          </div>
          <div className="text-sm mt-1 text-gray-400">32$ of portfolio</div>
          <div className="flex justify-between mt-8 ">
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 mr-2 rounded-md">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className="text-sm text-gray-500">Open</div>
                  <div className="text-sm font-medium">
                    ${StockData?.open.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-sm text-gray-500">Pre market</div>
                  <div className="text-sm font-medium">
                    ${StockData?.preMarket.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 ml-2 rounded-md">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className="text-sm text-gray-500">High</div>
                  <div className="text-sm font-medium">
                    ${StockData?.high.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-sm text-gray-500">Low</div>
                  <div className="text-sm font-medium">
                    ${StockData?.low.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center w-full bg-Light-Black text-white h-16 my-16 rounded-lg text-xl font-light"
            onClick={handleBuyStock}
          >
            Buy now
          </div>
        </div>
      </div>

      <div
        className={
          active
            ? "h-24 bg-white w-full flex flex-col items-center justify-around text-lg fixed bottom-0 left-0 transition-all "
            : "h-24 bg-white w-full flex flex-col items-center justify-center text-lg fixed bottom-0 left-0  -mb-24"
        }
      >
        <div onClick={handleWatchlist}>
          {stockData.Watchlist ? "Remove from watchlist" : "Add to watchlist"}
        </div>

        {stockData.Portfolio > 0 ? (
          <div className="text-red-500" onClick={HandleSellStock}>
            Sell your Stock
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TradingPage;

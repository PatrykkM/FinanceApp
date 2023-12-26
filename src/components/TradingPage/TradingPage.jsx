import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useParams, Link } from "react-router-dom";
import LineChart from "../../LineChart";
import { useDispatch, useSelector } from "react-redux";

const TradingPage = () => {
  const data = useSelector((state) => state.stockData);
  const params = useParams();
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.apiData);
  const ProcessingData = useSelector((state) => state.processingData);
  const currentCashBalance = useSelector((state) => state.currentCash);

  const StockDataArray = apiData.filter(
    (data) => data.symbol === params.symbol
  );

  const StockData = StockDataArray.length > 0 ? StockDataArray[0] : undefined;

  const DayPercentageChange =
    StockData && StockData?.close && StockData?.preMarket
      ? (100 * (StockData?.close - StockData?.preMarket)) / StockData?.preMarket
      : 0;
  const [active, setActive] = useState(false);
  const stockData = data.find((stock) => stock.LinkStock === params.symbol);

  const handleWatchlist = () => {
    const updatedStockData = { ...stockData, Watchlist: !stockData.Watchlist };
    dispatch({ type: "STOCK_DATA", payload: updatedStockData });

    setActive(!active);
  };
  const handleBuyStock = () => {
    dispatch({ type: "PROCESSING_DATA_STOCK", payload: true });

    setTimeout(() => {
      dispatch({ type: "PROCESSING_DATA_STOCK", payload: false });
      if (!ProcessingData && currentCashBalance > StockData?.close) {
        dispatch({
          type: "CURRENT_CASH",
          payload: currentCashBalance - StockData?.close * 100,
        });
        dispatch({
          type: "UPDATE_PORTFOLIO",
          payload: { LinkStock: params.symbol, actionType: "increase" },
        });
      }
    }, 5000);
  };
  const HandleSellStock = () => {
    dispatch({
      type: "CURRENT_CASH",
      payload: currentCashBalance + StockData?.close * 100,
    });
    setActive(!active);
    stockData.Portfolio = stockData.Portfolio - 1;
    if (stockData.Portfolio === -1) {
      stockData.Portfolio = 0;
    } else return;
  };
  const ClosePrice = StockData?.close;
  const AmountOfStocks = ClosePrice * stockData.Portfolio;

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

  return (
    <div className="flex flex-col items-center justify-center font-Roboto min-w-314px overflow-hidden w-full  bg-Light-Black">
      <div className="w-full">
        <div className=" flex justify-between items-center  w-full text-3xl text-white pt-14 sm:text-4xl">
          <Link to={"/FinanceApp"}>
            <div className="ml-3 ">
              <RiArrowLeftSLine />
            </div>
          </Link>

          <div className="font-light text-2xl tracking-wide sm:text-3xl">
            {StockData?.symbol}
          </div>
          <div className="mr-3" onClick={() => setActive(!active)}>
            <BiDotsVerticalRounded />
          </div>
        </div>
        <div className="flex flex-col justify-around items-center h-96 w-full text-white bg-Light-Black text-3xl sm:h-160">
          <div className="h-1/2 w-full mt-12 overflow-hidden sm:mt-28">
            <LineChart chartData={userData} options={options} />
          </div>
          <div className="w-full ">
            <ul className=" flex justify-between mx-1 text-xs text-gray-500 font-medium sm:text-base">
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
            <div className="text-3xl font-medium sm:text-4xl">
              ${ClosePrice}
            </div>
            {DayPercentageChange > 0 ? (
              <div className="flex justify-center items-center ml-3 text-xs w-14 h-6 bg-green-100 text-green-500 rounded-md mt-px sm:mt-1">
                +{DayPercentageChange.toFixed(2)}%
              </div>
            ) : (
              <div className="flex justify-center items-center ml-3 text-xs w-14 h-6 bg-red-100 text-red-500 rounded-md mt-px sm:mt-1">
                {DayPercentageChange.toFixed(2)}%
              </div>
            )}
          </div>
          <div className="text-sm mt-1 text-gray-400 sm:text-base">
            {AmountOfStocks.toFixed(2)}$ of {stockData.LinkStock} in portfolio
          </div>
          <div className="flex justify-between mt-8 ">
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 mr-2 rounded-md sm:h-56 text-sm sm:text-lg">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className=" text-gray-500">Open</div>
                  <div className=" font-medium">
                    ${StockData?.open.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className=" text-gray-500 ">Pre </div>
                  <div className="font-medium">
                    ${StockData?.preMarket.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 ml-2 rounded-md sm:h-56 text-sm sm:text-lg">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className=" text-gray-500">High</div>
                  <div className=" font-medium">
                    ${StockData?.high.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className=" text-gray-500">Low</div>
                  <div className=" font-medium">
                    ${StockData?.low.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center w-full bg-Light-Black text-white h-16 my-16 rounded-lg text-xl font-light sm:h-20"
            onClick={ProcessingData ? null : handleBuyStock}
          >
            {ProcessingData ? (
              <div className="flex items-center justify-center sm:text-2xl">
                Procesing data
                <svg
                  className="animate-spin ml-2 mr-3 h-5 w-5 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="sm:text-2xl">Buy now</div>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          active
            ? "h-28 bg-white w-full flex flex-col items-center justify-around text-lg fixed bottom-0 left-0 transition-all sm:text-2xl sm:h-32"
            : "h-28 bg-white w-full flex flex-col items-center justify-center text-lg fixed bottom-0 left-0  -mb-28 sm:text-2xl sm:h-32"
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

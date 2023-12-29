import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { icons } from "../../iqons";
import { useParams, Link } from "react-router-dom";
import LineChart from "../../LineChart";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../LandingPage/Navbar";
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

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
    if (window.innerWidth < 1024) {
      setActive(!active);
    }
    console.log(active);
  };

  const handleBuyStock = () => {
    dispatch({ type: "PROCESSING_DATA_STOCK", payload: true });

    setTimeout(() => {
      dispatch({ type: "PROCESSING_DATA_STOCK", payload: false });

      if (!ProcessingData && currentCashBalance > StockData?.close) {
        const newCashBalance = currentCashBalance - StockData?.close * 100;

        dispatch({
          type: "CURRENT_CASH",
          payload: newCashBalance,
        });

        const updatedPortfolioItem = {
          ...StockData,
          LinkStock: params.symbol,
          actionType: "increase",
        };

        dispatch({
          type: "UPDATE_PORTFOLIO",
          payload: updatedPortfolioItem,
        });
      }
    }, 5000);
  };
  const HandleSellStock = () => {
    if (stockData.Portfolio < 1) return;
    const newCashBalance = currentCashBalance + (StockData?.close || 0) * 100;

    dispatch({
      type: "CURRENT_CASH",
      payload: newCashBalance,
    });
    setActive(false);
    dispatch({
      type: "UPDATE_PORTFOLIO",
      payload: {
        LinkStock: StockData?.symbol,
        actionType: "decrease",
      },
    });
    dispatch({
      type: "UPDATE_DID_USER_SELL_STATUS",
      payload: true,
    });
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
  const [showYAxis, setShowYAxis] = useState(window.innerWidth > 1024);

  const userData = {
    labels: GraphStockData.map((data) => data.hour),
    datasets: [
      {
        data: GraphStockData.map((data) => data.Gain),
        borderColor: "#2366DC",
        backgroundColor: (context) => {
          const windowWidth = window.innerWidth;

          let gradientHeight;

          if (windowWidth < 640) {
            gradientHeight = 200;
          } else if (windowWidth < 1024) {
            gradientHeight = 350;
          } else {
            gradientHeight = 500;
          }

          const gradient = context.chart.ctx.createLinearGradient(
            0,
            0,
            0,
            gradientHeight
          );

          if (!showYAxis) {
            gradient.addColorStop(0, "#2366DC");
            gradient.addColorStop(1, "#1F1F1F");
          } else {
            gradient.addColorStop(0, "#2366DC");
            gradient.addColorStop(1, "#F2F3F6");
          }

          return gradient;
        },
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setShowYAxis(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    animation: {
      duration: 300,
    },
    scales: {
      x: {
        display: null,
      },
      y: {
        display: showYAxis,

        position: "right",
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          padding: 15,
          color: "Light-Black",
          font: {
            size: 14,
            family: "Roboto",
            weight: "normal",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    line: {
      borderCapStyle: "round",
    },
  };

  const IconComponent = stockData.iqon && icons[stockData.iqon];

  return (
    <>
      <div className="w-full overflow-hidden flex font-Roboto">
        <div className="hidden lg:block font-medium ">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center font-Roboto min-w-314px overflow-hidden w-full  bg-Light-Black lg:bg-white lg:ml-64 lg:grow lg:w-full ">
          <div className=" w-full lg:w-11/12   mt-10 lg:my-10 lg:bg-Darker-White  border border-Light-Black ">
            <div className="flex flex-col lg:p-8 ">
              <div className="flex items-start grow lg:hidden">
                <div className="flex text-white  w-full justify-between items-center">
                  <Link to={"/FinanceApp"}>
                    <div className="ml-3 text-2xl sm:text-3xl">
                      <RiArrowLeftSLine />
                    </div>
                  </Link>
                  <div className="font-light text-2xl tracking-wide sm:text-3xl ">
                    {StockData?.symbol}
                  </div>
                  <div
                    className="mr-3 text-2xl sm:text-3xl"
                    onClick={() => setActive(!active)}
                  >
                    <BiDotsVerticalRounded />
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex  w-full justify-between">
                <div className="flex items-start grow">
                  <div className=" h-20 w-20 bg-white rounded-xl flex justify-center items-center text-6xl text-Light-Black ">
                    {IconComponent && React.createElement(IconComponent)}
                  </div>
                  <div className="flex-col grow ">
                    <div className="flex  text-3xl justify-between grow  ml-2.5 text-Light-Black ">
                      <div className="flex ">
                        {stockData.StockName}
                        <div
                          className="flex ml-2 mt-px cursor-pointer "
                          onClick={handleWatchlist}
                        >
                          {stockData.Watchlist ? (
                            <IoStar className="text-yellow-400" />
                          ) : (
                            <IoStarOutline />
                          )}
                        </div>

                        <div></div>
                      </div>
                      <div className="flex "> ${ClosePrice}</div>
                    </div>
                    <div className="flex text-2xl justify-between grow  ml-3 text-Light-Black mt-3">
                      <div>U.S Stock</div>
                      {DayPercentageChange > 0 ? (
                        <div className="flex ">
                          <div className="flex justify-center  w-14 h-6  text-green-500 rounded-md mr-7">
                            ({DayPercentageChange.toFixed(2)}%)
                          </div>
                          <div>Last day</div>
                        </div>
                      ) : (
                        <div className="flex ">
                          <div className="flex justify-center    w-14 h-6  text-red-500 rounded-md mr-7">
                            ({DayPercentageChange.toFixed(2)}%)
                          </div>
                          <div>Last day</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div
                  className="hidden lg:flex justify-center items-center w-40 bg-Light-Black text-white h-11  rounded-lg text-base font-light mt-5 cursor-pointer"
                  onClick={ProcessingData ? null : handleBuyStock}
                >
                  {ProcessingData ? (
                    <div className="flex items-center justify-center ">
                      Procesing data
                      <svg
                        className="animate-spin ml-2  h-5 w-5 text-white "
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
                    <div>Buy now</div>
                  )}
                </div>
                <div
                  className="hidden lg:flex justify-center items-center w-40 bg-Light-Black text-white h-11  rounded-lg text-base font-light mt-5 cursor-pointer ml-5"
                  onClick={HandleSellStock}
                >
                  <div>Sell now</div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col h-96  items-center  w-full text-white bg-Light-Black text-3xl sm:h-160 lg:bg-Darker-White lg:justify-end">
              <div className="flex h-1/2 mt-10  grow w-full  overflow-hidden sm:mt-10 lg:my-2 ">
                <LineChart chartData={userData} options={options} />
              </div>
              <div className="w-full ">
                <ul className=" m-3 flex justify-between mx-1 text-xs text-gray-500 font-medium sm:text-base lg:mb-1 lg:hidden">
                  <li>Pre</li>
                  <li>Open</li>
                  <li>now</li>
                </ul>
              </div>
            </div>
          </div>
          <div></div>
          <div className="w-full flex justify-center items-center rounded-t-3xl bg-white lg:hidden">
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
                {AmountOfStocks.toFixed(2)}$ of {stockData.LinkStock} in
                portfolio
              </div>
              <div className="flex justify-between mt-8 ">
                <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 mr-2 rounded-md sm:h-56 text-sm sm:text-lg lg:w-2/5">
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
                <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 ml-2 rounded-md sm:h-56 text-sm sm:text-lg lg:w-2/5">
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
                ? "h-28 bg-white w-full flex flex-col items-center justify-around text-lg fixed bottom-0 left-0 transition-all sm:text-2xl "
                : "h-28 bg-white w-full flex flex-col items-center justify-center text-lg fixed bottom-0 left-0  -mb-28 sm:text-2xl "
            }
          >
            <div onClick={handleWatchlist}>
              {stockData.Watchlist
                ? "Remove from watchlist"
                : "Add to watchlist"}
            </div>
            {stockData.Portfolio > 0 ? (
              <div className="text-red-500" onClick={HandleSellStock}>
                Sell your Stock
              </div>
            ) : null}
          </div>

          <div className="hidden flex-col w-full lg:w-11/12   mb-10 bg-Darker-White p-5 border border-Light-Black lg:flex">
            <div className="text-2xl mb-4 ">Your Investmens</div>
            <div className="text-black flex grow justify-between font-medium mb-3 ">
              <div>
                {stockData.Portfolio}
                {stockData.Portfolio === 1 ? " share" : " shares"}
              </div>
              <div>${stockData.Portfolio * ClosePrice}</div>
            </div>
            <div className="flex justify-between grow border-t border-gray-300 pt-3 text-gray-500 uppercase text-sm font-medium">
              <div className="flex-col ">
                <div> Avg. price</div>
                <div className=" flex justify-center text-Light-Black mt-1">
                  ${stockData.Portfolio > 0 ? ClosePrice : 0}
                </div>
              </div>
              <div className="flex-col ">
                <div> sell price</div>
                <div className=" flex justify-center text-Light-Black mt-1">
                  ${stockData.DidUserSell ? ClosePrice : "N/A"}
                </div>
              </div>
              <div className="flex-col ">
                <div> Return</div>
                <div className=" flex justify-center text-Light-Black mt-1">
                  ${ClosePrice - ClosePrice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradingPage;

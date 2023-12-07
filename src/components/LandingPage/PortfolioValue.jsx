import React from "react";
import { data } from "../../Data";
import { useSelector } from "react-redux";

const PortfolioValue = () => {
  const apiData = useSelector((state) => state.apiData);
  if (!apiData || apiData.length === 0 || !apiData[0][0]) {
    return null;
  }
  const ClosePrice = apiData[0][0]?.close;
  const PreMarketPrice = apiData[0][0]?.preMarket;
  const DayPercentageChange =
    apiData && ClosePrice && PreMarketPrice
      ? (100 * (ClosePrice - PreMarketPrice)) / PreMarketPrice
      : 0;

  const amountInCents = 2455014;
  const PrecentageOfValue = amountInCents / 40000;

  const dollars = Math.floor(amountInCents / 100);
  const cents = amountInCents % 100;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars + cents / 100);
  return (
    <div className="flex flex-col mt-5">
      <div className="text-xs text-gray-400">Portfolio Value</div>
      <div className="text-4xl font-medium mt-1 ">{formattedAmount}</div>
      <div className="flex mt-7  justify-between">
        <div className="w-11/20 bg-Light-Blue h-56  rounded-lg flex flex-col">
          <div className="flex justify-center items-center h-3/5">
            <div className="border-Darker-Blue border-5  rounded-full w-24 h-24 text-2xl flex justify-center items-center ">
              {PrecentageOfValue.toFixed(0)}%
            </div>
          </div>
          <div className=" flex justify-center items-center  uppercase text-xs text-gray-500 mt-2">
            your goal
          </div>
          <div className=" flex justify-center items-center text-2xl mt-3">
            $40,000
          </div>
        </div>
        <div className="w-11/20  h-56 flex flex-col justify-between">
          <div className="bg-Light-Gray h-3/4 rounded-lg  flex flex-col items-center ">
            <div className="h-1/2 mt-6 w-4/5">
              <div className="w-8 h-8 bg-gray-200 rounded-full  flex items-center justify-center">
                {data[0].iqon}
              </div>
            </div>
            <div className="w-4/5">
              <div className="font-medium text-lg">{data[0].StockName}</div>
              <div className="flex text-xs ">
                <div className="text-gray-400 ">{ClosePrice}</div>
                {DayPercentageChange >= 0 ? (
                  <div className="text-green-500 text-xs ml-1">
                    +{DayPercentageChange.toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500 text-xs ml-1">
                    {DayPercentageChange.toFixed(2)}%
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-1/5 bg-Light-Black rounded-lg  flex justify-center items-center text-sm text-white  tracking-wide">
            Buy now
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioValue;

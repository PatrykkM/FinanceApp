import React from "react";
import { useSelector } from "react-redux";

const StockItem = ({ data, id }) => {
  const apiData = useSelector((state) => state.apiData);
  if (!apiData || apiData.length === 0 || !apiData[0][id]) {
    return null;
  }
  const ClosePrice = apiData[0][id]?.close;
  const PreMarketPrice = apiData[0][id]?.preMarket;
  const DayPercentageChange =
    apiData && ClosePrice && PreMarketPrice
      ? (100 * (ClosePrice - PreMarketPrice)) / PreMarketPrice
      : 0;

  return (
    <div>
      <div className="flex mb-6 justify-between">
        <div className="w-12 h-12 bg-Light-Gray rounded-sm flex justify-center items-center text-3xl text-Light-Black">
          {data.iqon}
        </div>
        <div className="flex  grow flex-col ml-5 justify-center">
          <div className="font-medium text-xl">{data.StockName}</div>
          <div className="uppercase text-sm text-gray-400">
            {apiData[0][id]?.symbol}
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <div className=" font-medium">${ClosePrice}</div>

          {DayPercentageChange >= 0 ? (
            <div className="text-green-500 text-sm">
              +{DayPercentageChange.toFixed(2)}%
            </div>
          ) : (
            <div className="text-red-500 text-sm">
              {DayPercentageChange.toFixed(2)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockItem;

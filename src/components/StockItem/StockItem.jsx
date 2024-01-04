import React from "react";
import { useSelector } from "react-redux";
import { icons } from "../../icons/icons";
const StockItem = ({ data, id }) => {
  const ApiStockData = useSelector((state) => state.apiData);
  const localStockData = useSelector((state) => state.stockData);

  const ActiveStocksSection = useSelector((state) => state.changeStocksSection);

  if (!ApiStockData || ApiStockData.length === 0 || !ApiStockData[id]) {
    return null;
  }
  const ClosePrice = ApiStockData[id]?.close;
  const PreMarketPrice = ApiStockData[id]?.preMarket;
  const DayPercentageChange =
    ApiStockData && ClosePrice && PreMarketPrice
      ? (100 * (ClosePrice - PreMarketPrice)) / PreMarketPrice
      : 0;
  const stockData = localStockData.find(
    (stock) => stock.LinkStock === ApiStockData[id]?.symbol
  );
  if (!stockData) {
    return null;
  }
  const AmountOfStocks = ClosePrice * stockData.Portfolio;
  const IconComponent = stockData.iqon && icons[stockData.iqon];

  return (
    <>
      <div>
        <div className="flex mb-6 justify-between">
          <div className="w-12 h-12 bg-Light-Gray rounded-sm flex justify-center items-center text-3xl text-Light-Black sm:h-14 sm:w-14 sm:text-4xl">
            {IconComponent && React.createElement(IconComponent)}
          </div>
          <div className="flex  grow flex-col ml-5 justify-center">
            <div className="font-medium text-xl sm:text-2xl ">
              {data.StockName}
            </div>
            <div className=" text-sm text-gray-400 sm:text-base ">
              {ActiveStocksSection.Portfolio
                ? `You have ${stockData.Portfolio} ${
                    stockData.Portfolio > 1 ? "stocks" : "stock"
                  }`
                : ApiStockData[id]?.symbol}
            </div>
          </div>
          <div className="flex flex-col justify-center items-end">
            <div className=" font-medium sm:text-lg">
              $
              {ActiveStocksSection.Portfolio
                ? AmountOfStocks.toFixed(2)
                : ClosePrice.toFixed(2)}
            </div>
            {DayPercentageChange >= 0 ? (
              <div className="text-green-500 text-sm sm:text-base">
                +{DayPercentageChange.toFixed(2)}%
              </div>
            ) : (
              <div className="text-red-500 text-sm sm:text-base">
                {DayPercentageChange.toFixed(2)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StockItem;

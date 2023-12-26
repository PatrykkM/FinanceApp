import React from "react";
import { icons } from "../../iqons";
import { useDispatch, useSelector } from "react-redux";

const TopAssets = () => {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.apiData);
  const Stockdata = useSelector((state) => state.stockData);
  const TopAssetsData = Stockdata.filter((data) => data.TopAssets === true);

  const handleWatchlist = (StockSymbol) => {
    const stockData = Stockdata.find(
      (stock) => stock.LinkStock === StockSymbol
    );
    const updatedStockData = {
      ...stockData,
      Watchlist: !stockData.Watchlist,
    };
    dispatch({ type: "STOCK_DATA", payload: updatedStockData });
  };

  const Asset = TopAssetsData.map((dataItem, id) => {
    const IconComponent = dataItem.iqon && icons[dataItem.iqon];
    const filtered = apiData.find((data) => data.symbol === dataItem.LinkStock);
    const DayPercentageChange =
      (100 * (filtered?.close - filtered?.preMarket)) / filtered?.preMarket;
    return (
      <div
        className="bg-white w-11/20 rounded-lg mb-2 flex justify-center items-center"
        key={dataItem.id}
      >
        <div className="w-full h-full  p-3">
          <div className="w-10 h-10 text-xl bg-gray-200 rounded-full  flex items-center justify-center ">
            {IconComponent && React.createElement(IconComponent)}
          </div>
          <div className="mt-4">
            {dataItem.StockName} ({dataItem.LinkStock})
          </div>
          <div className="text-lg font-semibold tracking-wide mt-1">
            ${filtered?.close}
          </div>
          <div>
            {DayPercentageChange >= 0 ? (
              <div className="flex text-sm mt-1">
                <div className="text-green-500   ">
                  +{DayPercentageChange.toFixed(2)}%
                </div>
                <div className="ml-1 text-gray-400 ">Per Day</div>
              </div>
            ) : (
              <div className="flex text-sm mt-1">
                <div className="text-red-500   ">
                  {DayPercentageChange.toFixed(2)}%
                </div>
                <div className="ml-1">Per Day</div>
              </div>
            )}
          </div>
          <div
            className="text-Light-Black font-medium text-center mt-16 cursor-pointer"
            onClick={() => handleWatchlist(dataItem.LinkStock)}
          >
            {dataItem.Watchlist ? "Watchlisted" : "Watchlist"}
          </div>
        </div>
      </div>
    );
  });

  return Asset;
};

export default TopAssets;

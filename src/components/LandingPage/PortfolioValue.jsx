import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TopAssets from "./TopAssets";
import { FaRegEyeSlash } from "react-icons/fa";
import { isVisibleCurrentCash } from "../../redux/actions";
import { FaRegEye } from "react-icons/fa";
import { icons } from "../../icons/icons";

const PortfolioValue = () => {
  const apiData = useSelector((state) => state.apiData);
  const currentCashBalance = useSelector((state) => state.currentCash);
  const isVisible = useSelector((state) => state.isVisibleCurrentCash);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stockData);

  if (!apiData || apiData.length === 0 || !apiData[0]) {
    return null;
  }
  const ClosePrice = apiData[0]?.close;
  const PreMarketPrice = apiData[0]?.preMarket;
  const DayPercentageChange =
    apiData && ClosePrice && PreMarketPrice
      ? (100 * (ClosePrice - PreMarketPrice)) / PreMarketPrice
      : 0;
  const amountInCents = currentCashBalance;
  const PrecentageOfValue = amountInCents / 400000;
  const dollars = Math.floor(amountInCents / 100);
  const cents = amountInCents % 100;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars + cents / 100);
  const HandleCashVisibility = () => {
    dispatch(isVisibleCurrentCash(!isVisible));
  };
  const IconComponent = data[0].iqon && icons[data[0].iqon];

  return (
    <div className="flex flex-col mt-5 lg:ml-64 lg:mt-12">
      <div className="text-xs text-gray-400 sm:text-sm">Cash Value</div>
      <div className="flex text-4xl font-medium mt-1 sm:text-5xl ">
        <div
          className={
            isVisible
              ? " blur-md  transition-all lg:ml-0 -z-10 ml-5"
              : "blur-0 transition-all -z-10"
          }
        >
          {formattedAmount}
        </div>
        <div
          className="ml-6 flex justify-center items-center cursor-pointer"
          onClick={HandleCashVisibility}
        >
          {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      </div>

      <div className="flex mt-7  justify-between lg:justify-start select-none">
        <div className="w-11/20 bg-Light-Blue h-56  rounded-lg flex flex-col sm:h-80 xl:w-96">
          <div className="flex justify-center items-center h-3/5">
            <div
              className={`border-Darker-Blue border-5 rounded-full w-24 h-24 text-2xl flex justify-center items-center sm:w-32 sm:h-32 sm:text-3xl `}
            >
              {isVisible ? "?" : `${PrecentageOfValue.toFixed(0)}%`}
            </div>
          </div>
          <div className=" flex justify-center items-center  uppercase text-xs text-gray-500 mt-2 sm:text-sm">
            your goal
          </div>
          <div className=" flex justify-center items-center text-2xl mt-3 sm:text-3xl">
            $400,000
          </div>
        </div>

        <div className="w-11/20  h-56 flex flex-col justify-between sm:h-80 lg:ml-20 xl:w-96 ">
          <div className="bg-Light-Gray h-3/4 rounded-lg  flex flex-col items-center ">
            <div className="h-1/2 mt-6 w-4/5">
              <div className="w-8 h-8 bg-gray-200 rounded-full  flex items-center justify-center sm:w-12 sm:h-12 sm:text-2xl">
                {IconComponent && React.createElement(IconComponent)}
              </div>
            </div>
            <div className="w-4/5">
              <div className="font-medium text-lg sm:text-2xl">
                {data[0].StockName}
              </div>
              <div className="flex text-xs sm:text-sm">
                <div className="text-gray-400 ">${ClosePrice}</div>
                {DayPercentageChange >= 0 ? (
                  <div className="text-green-500 text-xs ml-1 sm:text-sm">
                    +{DayPercentageChange.toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-red-500 text-xs ml-1 sm:text-sm">
                    {DayPercentageChange.toFixed(2)}%
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" h-1/5 bg-Light-Black rounded-lg  flex justify-center items-center text-sm text-white  tracking-wide sm:text-base">
            <Link to={"TSLA"} className="w-full text-center">
              Buy now
            </Link>
          </div>
        </div>
        <div className="hidden w-11/20 bg-Light-Gray h-56  rounded-lg flex-col sm:h-80 xl:w-96 items-center ml-20 xxxl:flex transition-colors">
          <div className="flex justify-between h-1/6  items-center text-lg w-11/12">
            <div className="font-medium ">Top Assets</div>
            <div className="mt-px">
              <HiOutlineDotsVertical />
            </div>
          </div>
          <div className="  flex justify-between w-11/12 h-4/5 ">
            <TopAssets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioValue;

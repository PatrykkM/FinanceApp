import React from "react";
import Watchlist from "./Watchlist";
import { useDispatch, useSelector } from "react-redux";
import { changeStocksSection } from "../../redux/actions";
import Popular from "./Popular";
import Portfolio from "./Portfolio";

const Investments = () => {
  const dispatch = useDispatch();
  const handleItemClick = (newSectionData) => {
    dispatch(changeStocksSection(newSectionData));
  };
  const ActiveStocksSection = useSelector((state) => state.changeStocksSection);
  return (
    <div className="flex flex-col mt-10 lg:ml-64">
      <div className="text-xl font-medium sm:text-2xl">Investments</div>
      <div className="flex text-gray-400 text-xs tracking-wide my-6 sm:text-sm ">
        <div
          className={
            ActiveStocksSection.Popular
              ? "  bg-Darker-Blue px-3 py-2 rounded-full text-white  transition-all sm:px-6 sm:py-3 lg:px-7 cursor-pointer"
              : " bg-Light-Gray px-3 py-2 rounded-full  transition-all sm:px-6 sm:py-3 cursor-pointer lg:px-7"
          }
          onClick={() =>
            handleItemClick({
              Portfolio: false,
              Watchlist: false,
              Popular: true,
            })
          }
        >
          Popular
        </div>
        <div
          className={
            ActiveStocksSection.Portfolio
              ? "bg-Darker-Blue px-3 py-2 rounded-full text-white transition-all ml-2 sm:px-6 sm:py-3 lg:px-7 cursor-pointer"
              : "bg-Light-Gray px-3 py-2 rounded-full  transition-all ml-2 sm:px-6 sm:py-3 cursor-pointer lg:px-7"
          }
          onClick={() =>
            handleItemClick({
              Portfolio: true,
              Watchlist: false,
              Popular: false,
            })
          }
        >
          Portfolio
        </div>
        <div
          className={
            ActiveStocksSection.Watchlist
              ? "bg-Darker-Blue px-3 py-2 rounded-full text-white ml-2 transition-all sm:px-6 sm:py-3 cursor-pointer lg:px-7"
              : "bg-Light-Gray px-3 py-2 rounded-full ml-2 transition-all sm:px-6 sm:py-3 cursor-pointer lg:px-7 "
          }
          onClick={() =>
            handleItemClick({
              Portfolio: false,
              Watchlist: true,
              Popular: false,
            })
          }
        >
          Watchlist
        </div>
      </div>
      {ActiveStocksSection.Popular && <Popular />}
      {ActiveStocksSection.Watchlist && <Watchlist />}
      {ActiveStocksSection.Portfolio && <Portfolio />}
    </div>
  );
};

export default Investments;

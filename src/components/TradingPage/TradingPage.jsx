import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowLeftSLine } from "react-icons/ri";

const TradingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center font-Roboto min-w-314px overflow-hidden w-full  bg-Light-Black">
      <div className="w-full">
        <div className=" flex justify-between items-center  w-full text-3xl text-white pt-14 ">
          <div className="ml-3">
            <RiArrowLeftSLine />
          </div>
          <div className="font-light text-2xl">Apple</div>
          <div className="mr-3">
            <BiDotsVerticalRounded />
          </div>
        </div>
        <div className="flex justify-center items-center h-96 w-full text-white bg-Light-Black text-3xl">
          Here will be Graph
        </div>
      </div>
      <div className="w-full flex justify-center items-center rounded-t-3xl bg-white ">
        <div className="flex flex-col w-11/12">
          <div className="flex mt-12">
            <div className="text-3xl font-medium ">$1,246.43</div>
            <div className="flex justify-center items-center ml-3 text-xs w-14 h-6 bg-green-100 text-green-500 rounded-md mt-px">
              +2,35%
            </div>
          </div>
          <div className="text-sm mt-1 text-gray-400">32$ of portfolio</div>
          <div className="flex justify-between mt-8 ">
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 mr-2 rounded-md">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className="text-sm text-gray-500">Open</div>
                  <div className="text-sm font-medium">$125.25</div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-sm text-gray-500">Close</div>
                  <div className="text-sm font-medium">$135.25</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 h-24 ml-2 rounded-md">
              <div className="flex flex-col justify-around  h-4/5 w-4/5">
                <div className="flex  justify-between w-full items-center">
                  <div className="text-sm text-gray-500">High</div>
                  <div className="text-sm font-medium">$165.25</div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-sm text-gray-500">Low</div>
                  <div className="text-sm font-medium">$115.25</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full bg-Light-Black text-white h-16 my-16 rounded-lg text-xl font-light">
            Buy now
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;

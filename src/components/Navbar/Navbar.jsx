import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UserImg from "../../img/User.jpg";
import { useDispatch, useSelector } from "react-redux";
import { showAndHideCartMobile } from "../../redux/actions";
import { RxCross1 } from "react-icons/rx";
import { TiHomeOutline } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { LuFolderSearch2 } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { FaUncharted } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const cartMobileVisible = useSelector((state) => state.showAndHideCartMobile);
  const handleItemClick = () => {
    dispatch(showAndHideCartMobile(!cartMobileVisible));
  };
  return (
    <>
      <div className="flex  mt-10 w-full items-center justify-between lg:hidden lg:items-start z-50">
        <div className="text-2xl sm:text-3xl lg:hidden">
          <RxHamburgerMenu
            onClick={() =>
              handleItemClick({
                showAndHideCartMobile: !showAndHideCartMobile,
              })
            }
          />
        </div>
        <div>
          <img
            src={UserImg}
            alt="CurrentUserImg"
            className="w-12 h-12 rounded-full mb-1 sm:w-14 sm:h-14"
          />
        </div>
      </div>
      <div
        className={
          cartMobileVisible
            ? "h-full lg:justify-between  fixed bg-white w-48 left-0 top-0 text-Light-Black flex grow text-xl font-medium flex-col  transition-all sm:w-64 lg:items-start lg:ml-0 lg:border-r "
            : "h-full lg:justify-between fixed bg-white w-48 left-0 top-0 text-Light-Black flex grow  text-xl font-medium flex-col transition-all -ml-52 sm:-ml-64 sm:w-64 lg:items-start lg:ml-0 lg: border-r "
        }
      >
        <RxCross1
          className="text-3xl h-10% self-start ml-4 mt-12 justify-self-start sm:text-4xl lg:hidden"
          onClick={() =>
            handleItemClick({
              showAndHideCartMobile: !showAndHideCartMobile,
            })
          }
        />
        <ul className="mt-12 sm:text-2xl ml-5 lg:text-xl">
          <li className="mb-20 hidden lg:flex text-3xl text-Darker-Blue font-medium ">
            <FaUncharted className="text-Darker-Blue mr-1 cursor-pointer" />
            Finance.
          </li>
          <Link to={"/FinanceApp"}>
            <li className="mb-5 flex cursor-pointer ">
              <TiHomeOutline className="mt-3px mr-2 " />
              Home
            </li>
          </Link>
          <li className="mb-5 flex cursor-pointer">
            <RxDashboard className="mt-3px mr-2" />
            Dashboard
          </li>
          <li className="mb-5 flex cursor-pointer">
            <LuFolderSearch2 className="mt-3px mr-2" />
            Discover
          </li>
          <li className="mb-5 flex cursor-pointer">
            <GiSettingsKnobs className="mt-3px mr-2" />
            Settings
          </li>
          <li className="mb-5 flex  justify-self-end cursor-pointer">
            <IoWalletOutline className="mt-3px mr-2" />
            Wallet
          </li>
        </ul>
        <div className="hidden lg:flex  flex-col items-end w-full mb-1 ml-px p-2">
          <div className=" flex  justify-self-start w-full mb-6 cursor-pointer">
            <BsTelephone className="mt-3px mr-2 ml-3" />
            Support
          </div>
          <div className="flex flex-col items-center w-full ">
            <div className="h-2 border-t w-11/12">xx</div>
            <div className="flex items-center justify-between w-full">
              <img
                src={UserImg}
                alt="CurrentUserImg"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div className="grow">User1</div>
              <div className="text-3xl cursor-pointer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

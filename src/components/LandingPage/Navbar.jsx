import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UserImg from "../../img/User.jpg";
import { useDispatch, useSelector } from "react-redux";
import { showAndHideCartMobile } from "../../redux/actions";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const dispatch = useDispatch();

  const cartMobileVisible = useSelector((state) => state.showAndHideCartMobile);
  const handleItemClick = () => {
    dispatch(showAndHideCartMobile(!cartMobileVisible));
  };
  return (
    <>
      <div className="flex  mt-10 w-full items-center justify-between">
        <div className="text-2xl ">
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
            className="w-12 h-12 rounded-full mb-1"
          />
        </div>
      </div>
      <div
        className={
          cartMobileVisible
            ? "h-full fixed bg-white w-52 left-0 top-0 text-Light-Black flex  items-center text-xl font-medium flex-col  transition-all "
            : "h-full fixed bg-white w-52 left-0 top-0 text-Light-Black flex  items-center text-xl font-medium flex-col transition-all -ml-52 "
        }
      >
        <RxCross1
          className="text-3xl h-10% self-start ml-4 mt-12 justify-self-start "
          onClick={() =>
            handleItemClick({
              showAndHideCartMobile: !showAndHideCartMobile,
            })
          }
        />
        <ul className="mt-12">
          <li className="mb-7">Withdraw</li>
          <li className="mb-7">Account</li>
          <li className="mb-7">Settings</li>
          <li className="mb-7">About us</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
import Navbar from "./components/LandingPage/Navbar";
import PortfolioValue from "./components/LandingPage/PortfolioValue";
import Investments from "./components/LandingPage/Investments";
const LandingPage = () => {
  return (
    <>
      <div className="block lg:flex ">
        <Navbar />
        <div className="block lg:flex lg:flex-col lg:grow">
          <PortfolioValue />
          <Investments />
        </div>
      </div>
    </>
  );
};

export default LandingPage;

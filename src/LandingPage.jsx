import React from "react";
import Navbar from "./components/LandingPage/Navbar";
import PortfolioValue from "./components/LandingPage/PortfolioValue";
import Investments from "./components/LandingPage/Investments";
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <PortfolioValue />
      <Investments />
    </>
  );
};

export default LandingPage;

import React from "react";
import LandingPage from "./LandingPage";
import "./index.css";
const App = () => {
  return (
    <div
      id="WRAPPER"
      className="flex items-center justify-center font-Roboto min-w-314px"
    >
      <div className="overflow-hidden flex flex-col w-11/12   justify-center">
        <LandingPage />
      </div>
    </div>
  );
};

export default App;

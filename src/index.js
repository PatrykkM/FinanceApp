import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import FetchDataApi from "./components/Fetch/FetchDataApi";
import TradingPage from "./components/TradingPage/TradingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <FetchDataApi />
    <Router>
      <Routes>
        <Route path="*" exact element={<App />} />
        <Route path="/FinanceApp/:symbol" element={<TradingPage />} />
      </Routes>
    </Router>
  </Provider>
);

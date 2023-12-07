import React from "react";
import { data } from "../../Data";
import StockItem from "./StockItem";
import { Link } from "react-router-dom";

const Watchlist = () => {
  return data.map((dataItem) => {
    return (
      <Link key={dataItem.id} to={dataItem.StockName}>
        <StockItem
          key={dataItem.id}
          data={dataItem}
          id={dataItem.id}
          Links={dataItem.LinkStock}
        />
      </Link>
    );
  });
};

export default Watchlist;

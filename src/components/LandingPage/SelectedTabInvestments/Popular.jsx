import React from "react";
import StockItem from "../../StockItem/StockItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Popular = () => {
  const data = useSelector((state) => state.stockData);
  return data.map((dataItem) => {
    return (
      <Link key={dataItem.id} to={dataItem.LinkStock}>
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

export default Popular;

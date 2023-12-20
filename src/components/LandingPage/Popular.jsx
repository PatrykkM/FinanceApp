import React from "react";
import { data } from "../../Data";
import StockItem from "./StockItem";
import { Link } from "react-router-dom";

const Popular = () => {
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

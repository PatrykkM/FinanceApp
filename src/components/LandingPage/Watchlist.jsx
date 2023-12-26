import React from "react";
import StockItem from "./StockItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const data = useSelector((state) => state.stockData);
  const WatchlistData = data.filter((data) => data.Watchlist === true);
  const ValueOfPortfolio = WatchlistData.map((dataItem) => (
    <Link key={dataItem.id} to={dataItem.LinkStock}>
      <StockItem
        key={dataItem.id}
        data={dataItem}
        id={dataItem.id}
        Links={dataItem.LinkStock}
      />
    </Link>
  ));

  return WatchlistData.length > 0 ? (
    ValueOfPortfolio
  ) : (
    <div className="mt-8 flex  items-center flex-col mb-14">
      <div>You don't have any stocks </div>
      <div>in watchlist. Go add your</div>
      <div> first stock to watchlist and spy</div>
      <div> your favorite stocks right now!</div>
    </div>
  );
};

export default Watchlist;

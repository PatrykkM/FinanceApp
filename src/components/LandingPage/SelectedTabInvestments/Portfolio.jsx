import React from "react";
import StockItem from "../../StockItem/StockItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Portfolio = () => {
  const data = useSelector((state) => state.stockData);
  const WatchlistData = data.filter((data) => data.Portfolio > 0);
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
    <div className=" mt-8 flex  items-center flex-col mb-14">
      <div>You don't have any stocks.</div>
      <div>Go buy your first stock </div>
      <div>and start investing right now! </div>
    </div>
  );
};

export default Portfolio;

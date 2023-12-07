import { SiTesla } from "react-icons/si";
import { SiApple } from "react-icons/si";
import { SiMeta } from "react-icons/si";

export const data = [
  {
    id: 0,
    StockName: "Tesla",
    iqon: <SiTesla />,
    LinkStock: "TSLA",
    Watchlist: false,
    Portfolio: false,
    NonApiPrice: 250,
  },
  {
    id: 1,
    StockName: "Apple",
    iqon: <SiApple />,
    LinkStock: "AAPL",
    Watchlist: false,
    Portfolio: false,
    NonApiPrice: 150,
  },
  {
    id: 2,
    StockName: "Meta",
    iqon: <SiMeta />,
    LinkStock: "META",
    Watchlist: false,
    Portfolio: false,
    NonApiPrice: 350,
  },
];

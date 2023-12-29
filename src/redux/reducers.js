import {
  SET_API_DATA,
  CHANGE_STOCKS_SECTION,
  CHANGE_CART_VISIBILITY,
  PROCESSING_DATA_STOCK,
  CURRENT_CASH,
  IS_VISIBLE_CURRENT_CASH,
  STOCK_DATA,
  UPDATE_PORTFOLIO,
} from "./actions";

const initialState = {
  apiData: [],
  changeStocksSection: {
    Portfolio: false,
    Watchlist: false,
    Popular: true,
  },
  showAndHideCartMobile: false,
  processingData: false,
  currentCash: 240500 * 100,
  isVisibleCurrentCash: false,
  stockData: [
    {
      id: 0,
      StockName: "Tesla",
      iqon: "SiTesla",
      LinkStock: "TSLA",
      Watchlist: false,
      Portfolio: 0,
      DidUserSell: false,
    },
    {
      id: 1,
      StockName: "Apple",
      iqon: "SiApple",
      LinkStock: "AAPL",
      Watchlist: false,
      Portfolio: 0,
      TopAssets: true,
      DidUserSell: false,
    },
    {
      id: 2,
      StockName: "Meta",
      iqon: "SiMeta",
      LinkStock: "META",
      Watchlist: false,
      Portfolio: 0,
      DidUserSell: false,
    },
    {
      id: 3,
      StockName: "Airbnb",
      iqon: "SiAirbnb",
      LinkStock: "ABNB",
      Watchlist: false,
      Portfolio: 0,
      TopAssets: true,
      DidUserSell: false,
    },
    {
      id: 4,
      StockName: "IBM",
      iqon: "SiIbm",
      LinkStock: "IBM",
      Watchlist: false,
      Portfolio: 0,
      DidUserSell: false,
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        apiData: action.payload,
      };
    case STOCK_DATA:
      const updatedWatchlistData = action.payload;
      return {
        ...state,
        stockData: state.stockData.map((stock) =>
          stock.id === updatedWatchlistData.id
            ? { ...stock, Watchlist: updatedWatchlistData.Watchlist }
            : stock
        ),
      };

    case UPDATE_PORTFOLIO:
      const { LinkStock, actionType } = action.payload;
      const updatedStockData = state.stockData.map((stock) => {
        if (stock.LinkStock === LinkStock) {
          if (actionType === "increase") {
            return { ...stock, Portfolio: stock.Portfolio + 1 };
          } else if (actionType === "decrease" && stock.Portfolio > 0) {
            return {
              ...stock,
              Portfolio: stock.Portfolio - 1,
              DidUserSell: true,
            };
          }
        }
        return stock;
      });

      return {
        ...state,
        stockData: updatedStockData,
      };
    case CHANGE_STOCKS_SECTION:
      return {
        ...state,
        changeStocksSection: {
          ...state.changeStocksSection,
          ...action.payload,
        },
      };
    case CHANGE_CART_VISIBILITY:
      return {
        ...state,
        showAndHideCartMobile: action.payload,
      };
    case PROCESSING_DATA_STOCK:
      return {
        ...state,
        processingData: action.payload,
      };
    case CURRENT_CASH:
      return {
        ...state,
        currentCash: action.payload,
      };
    case IS_VISIBLE_CURRENT_CASH:
      return {
        ...state,
        isVisibleCurrentCash: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

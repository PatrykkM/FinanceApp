export const SET_API_DATA = "SET_API_DATA";
export const CHANGE_STOCKS_SECTION = "CHANGE_STOCKS_SECTION";
export const CHANGE_CART_VISIBILITY = "CHANGE_CART_VISIBILITY";
export const PROCESSING_DATA_STOCK = "PROCESSING_DATA_STOCK";
export const CURRENT_CASH = "CURRENT_CASH";
export const IS_VISIBLE_CURRENT_CASH = "IS_VISIBLE_CURRENT_CASH";
export const STOCK_DATA = "STOCK_DATA";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";
export const SET_USER_SELL_STATUS = "SET_USER_SELL_STATUS";

export const setAPIData = (apiData) => ({
  type: SET_API_DATA,
  payload: apiData,
});
export const changeStocksSection = (StockSectionData) => ({
  type: CHANGE_STOCKS_SECTION,
  payload: StockSectionData,
});
export const showAndHideCartMobile = (CartMobile) => ({
  type: CHANGE_CART_VISIBILITY,
  payload: CartMobile,
});
export const processingData = (processing) => ({
  type: PROCESSING_DATA_STOCK,
  payload: processing,
});
export const currentCash = (data) => ({
  type: CURRENT_CASH,
  payload: data,
});
export const isVisibleCurrentCash = (data) => ({
  type: IS_VISIBLE_CURRENT_CASH,
  payload: data,
});
export const stockData = (data) => ({
  type: STOCK_DATA,
  payload: data,
});
export const updatePortfolio = (data) => ({
  type: UPDATE_PORTFOLIO,
  payload: data,
});
export const setUserSellStatus = () => {
  return {
    type: "SET_USER_SELL_STATUS",
    payload: true,
  };
};

export const SET_API_DATA = "SET_API_DATA";
export const CHANGE_STOCKS_SECTION = "CHANGE_STOCKS_SECTION";
export const CHANGE_CART_VISIBILITY = "CHANGE_CART_VISIBILITY";

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

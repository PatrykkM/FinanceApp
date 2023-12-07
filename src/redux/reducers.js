import {
  SET_API_DATA,
  CHANGE_STOCKS_SECTION,
  CHANGE_CART_VISIBILITY,
} from "./actions";

const initialState = {
  apiData: [],
  changeStocksSection: {
    Portfolio: true,
    Watchlist: false,
    Popular: false,
  },
  showAndHideCartMobile: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        apiData: [...state.apiData, action.payload],
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
    default:
      return state;
  }
};

export default rootReducer;

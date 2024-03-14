export const reducer = (state, action) => {
  switch (action.type) {
    case "updateFromCurrency":
      return { ...state, fromCurrency: { ...action.payload } };
    case "updateToCurrency":
      return { ...state, toCurrency: { ...action.payload } };
    case "updateCurrencyAmount":
      return { ...state, amount: action.payload };
    case "inverseCurrency":
      return {
        ...state,
        fromCurrency: { ...state.toCurrency },
        toCurrency: { ...state.fromCurrency },
      };
    case "updateResult":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

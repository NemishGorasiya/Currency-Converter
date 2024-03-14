const KEY = import.meta.env.VITE_API_KEY;
export const API_DATA = {
  fetchCountryCode: {
    url: "https://currency-converter-pro1.p.rapidapi.com/currencies",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": KEY,
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  },
  fetchResult: {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": KEY,
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  },
};
// import.meta.env.VITE_API_KEY

export const INITIAL_STATE = {
  fromCurrency: {
    currencyCode: "USD",
    countryCurrencyName: "United States Dollar",
    flagImage: "https://flagsapi.com/US/flat/64.png",
  },
  toCurrency: {
    currencyCode: "INR",
    countryCurrencyName: "Indian Rupee",
    flagImage: "https://flagsapi.com/IN/flat/64.png",
  },
  amount: "",
  result: 0,
};

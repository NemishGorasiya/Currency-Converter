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

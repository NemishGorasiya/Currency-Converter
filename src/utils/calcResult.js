import { fetchData } from "../http/fetchDataAPI";
import { API_DATA } from "./constant";

export const calcResult = async (fromCurrency, toCurrency, amount) => {
  const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurrency.currencyCode}&to=${toCurrency.currencyCode}&amount=${amount}`;
  const { method, headers } = API_DATA.fetchResult;
  const res = await fetchData({
    url: url,
    method: method,
    headers: headers,
  });
  return res;
};

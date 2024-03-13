import { useCallback, useEffect, useReducer, useState } from "react";

import Result from "./Result";
import ReactSelect from "./Select";
import { fetchData } from "../http/fetchDataAPI";
import { API_DATA } from "../utils/constant";
import Input from "./Input";
import { debounce } from "../utils/utilFunctions";

const INITIAL_STATE = {
  fromCurrency: "USD",
  toCurrency: "INR",
  amount: "",
  result: 0,
};

const reducer = (state, action) => {
  if (action.type === "updateFromCurrency") {
    return { ...state, fromCurrency: action.payload };
  }
  if (action.type === "updateToCurrency") {
    return { ...state, toCurrency: action.payload };
  }
  if (action.type === "updateCurrencyAmount") {
    return { ...state, amount: action.payload };
  }
  if (action.type === "inverseCurrency") {
    return {
      ...state,
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
    };
  }
  if (action.type === "updateResult") {
    return { ...state, ...action.payload };
  }
  return { ...state };
};

const Converter = () => {
  const [userInput, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [options, setOptions] = useState([]);

  const calculateCurrency = useCallback(
    async ({
      fromCurrency = userInput.fromCurrency,
      toCurrency = userInput.toCurrency,
      amount = userInput.amount,
    }) => {
      const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurrency.currencyCode}&to=${toCurrency.currencyCode}&amount=${amount}`;
      const { method, headers } = API_DATA.fetchResult;
      const res = await fetchData({
        url: url,
        method: method,
        headers: headers,
      });
      const resRequest = res.request;
      dispatch({
        type: "updateResult",
        payload: {
          amount: resRequest.amount,
          result: res.result,
        },
      });
    },
    [userInput.amount, userInput.fromCurrency, userInput.toCurrency]
  );

  const handleDebounce = useCallback(debounce(calculateCurrency, 1000), []);

  const handleSelectFromCurrency = useCallback(
    (fromCurrency) => {
      dispatch({
        type: "updateFromCurrency",
        payload: fromCurrency,
      });
      calculateCurrency({ fromCurrency: fromCurrency });
    },
    [calculateCurrency]
  );

  const handleSelectToCurrency = (toCurrency) => {
    dispatch({
      type: "updateToCurrency",
      payload: toCurrency,
    });
    calculateCurrency({ toCurrency: toCurrency });
  };

  const handleInverseCurrency = () => {
    dispatch({
      type: "inverseCurrency",
    });
    calculateCurrency();
  };

  const makeOptions = useCallback((countryCodeData) => {
    setOptions(
      Object.entries(countryCodeData).map((contryData) => ({
        currencyCode: contryData[0],
        currencyName: contryData[1],
        flagImage: `https://flagsapi.com/${contryData[0].slice(
          0,
          2
        )}/flat/64.png`,
      }))
    );
  }, []);

  const fetchCountryCodeData = useCallback(async () => {
    const { url, method, headers } = API_DATA.fetchCountryCode;
    const res = await fetchData({ url, method, headers });
    makeOptions(res.result);
  }, [makeOptions]);

  useEffect(() => {
    fetchCountryCodeData();
  }, [fetchCountryCodeData]);

  return (
    <div className="inputSection">
      <Input label="Amount" id="amount" handleAmountChange={handleDebounce} />
      <ReactSelect
        label="From"
        id="from"
        handleSelect={handleSelectFromCurrency}
        userInput={userInput}
        options={options}
      />
      <button className="exchangeBtn" onClick={handleInverseCurrency}>
        <i className="fa-solid fa-arrow-right-arrow-left"></i>
      </button>
      <ReactSelect
        label="To"
        id="to"
        handleSelect={handleSelectToCurrency}
        userInput={userInput}
        options={options}
      />
      <Result result={{ ...userInput }} />
    </div>
  );
};

export default Converter;

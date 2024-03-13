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
};
const INITIAL_RESULT_STATE = {
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
  return { ...state };
};

const Converter = () => {
  const [userInput, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(INITIAL_RESULT_STATE);

  const calculateCurrency = useCallback(
    async ({
      fromCurrency = userInput.fromCurrency,
      toCurrency = userInput.toCurrency,
      amount = userInput.amount,
    }) => {
      const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
      const { method, headers } = API_DATA.fetchResult;
      const res = await fetchData({
        url: url,
        method: method,
        headers: headers,
      });
      const resRequest = res.request;
      setResult({
        fromCurrency: resRequest.from,
        toCurrency: resRequest.to,
        amount: resRequest.amount,
        result: res.result,
      });
    },
    [userInput]
  );

  const handleDebounce = useCallback(
    (value) => {
      debounce(calculateCurrency(value), 1000);
    },
    [calculateCurrency]
  );

  const handleSelectFromCurrency = (fromCurrency) => {
    dispatch({
      type: "updateFromCurrency",
      payload: fromCurrency.currencyCode,
    });
    handleDebounce({ fromCurrency: fromCurrency.currencyCode });
  };
  const handleSelectToCurrency = (toCurrency) => {
    dispatch({
      type: "updateToCurrency",
      payload: toCurrency.currencyCode,
    });
    handleDebounce({ toCurrency: toCurrency.currencyCode });
  };
  const handleInverseCurrency = () => {
    dispatch({
      type: "inverseCurrency",
    });
  };
  const handleAmountChange = (amount) => {
    dispatch({
      type: "updateCurrencyAmount",
      payload: amount,
    });
    handleDebounce({ amount: amount });
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
      <Input
        label="Amount"
        id="amount"
        userInput={userInput}
        handleAmountChange={handleAmountChange}
      />
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
      <Result result={{ ...result }} />
    </div>
  );
};

export default Converter;

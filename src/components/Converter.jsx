import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import Result from "./Result";
import ReactSelect from "./Select";
import { fetchData } from "../http/fetchDataAPI";
import { API_DATA } from "../utils/constant";
import { debounce, onlyNumberValidate } from "../utils/utilFunctions";
import Input from "./Input";

const INITIAL_STATE = {
  fromCurrency: "USD",
  toCurrency: "INR",
  amount: "",
};

const reducer = (state, action) => {
  if (action.type === "updateFromCurrency") {
    console.log("updateFRom");
    console.log(state);
  }
  if (action.type === "updateToCurrency") {
    console.log("updateTo");
    console.log(state);
  }
  if (action.type === "updateCurrencyAmount") {
    console.log("updateAmount");
    console.log(state);
  }
  if (action.type === "inverseCurrency") {
    console.log("inverse");
    console.log(state);
  }
  return INITIAL_STATE;
};

const Converter = () => {
  const [userInput, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [countryCodeData, setCountryCodeData] = useState({});
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const timeoutRef = useRef(null);

  // const calculateAnswer = useCallback(
  //   async ({
  //     amountValue = 0,
  //     toCurrencyValue = "",
  //     fromCurrencyValue = "",
  //   }) => {
  //     const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${
  //       fromCurrencyValue || fromCurrency
  //     }&to=${toCurrencyValue || toCurrency}&amount=${amountValue || amount}`;
  //     const { method, headers } = API_DATA.fetchResult;
  //     if (!isLoading) {
  //       setIsLoading(true);
  //     }
  //     const res = await fetchData({
  //       url: url,
  //       method: method,
  //       headers: headers,
  //     });
  //     setIsLoading(false);
  //     setResult(res ?? 0);
  //     setAmountToShow(amountValue || amount);
  //   },
  //   [amount, toCurrency, fromCurrency, isLoading]
  // );

  const handleSelectFromCurrency = (fromCurrency) => {
    dispatch({
      type: "updateToCurrency",
      payload: fromCurrency,
    });
  };
  const handleSelectToCurrency = () => {
    dispatch({
      type: "updateFromCurrency",
    });
  };
  const handleInverseToandFrom = () => {
    dispatch({
      type: "inverseCurrency",
    });
  };
  const handleAmountChange = () => {
    dispatch({
      type: "updateCurrencyAmount",
    });
  };

  const makeOptions = useCallback((countryCodeData) => {
    setOptions(
      Object.entries(countryCodeData).map((contryData) => ({
        value: contryData[0],
        label: contryData[1],
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
    setCountryCodeData(res);
    makeOptions(res);
  }, [makeOptions]);

  useEffect(() => {
    fetchCountryCodeData();
  }, [fetchCountryCodeData]);

  return (
    <div className="inputSection">
      <Input
        label="Amount"
        id="amount"
        handleAmountChange={handleAmountChange}
      />
      <ReactSelect
        label="From"
        id="from"
        handleSelect={handleSelectFromCurrency}
        userInput={userInput}
        options={options}
      />
      <button className="exchangeBtn" onClick={handleInverseToandFrom}>
        <i className="fa-solid fa-arrow-right-arrow-left"></i>
      </button>
      <ReactSelect
        label="To"
        id="to"
        handleSelect={handleSelectToCurrency}
        userInput={userInput}
        options={options}
      />
      {/* <Result /> */}
    </div>
  );
};

export default Converter;

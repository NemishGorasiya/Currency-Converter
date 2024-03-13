import { useCallback, useEffect, useRef, useState } from "react";

import Result from "./Result";
import ReactSelect from "./Select";
import { fetchData } from "../http/fetchDataAPI";
import { API_DATA } from "../utils/constant";
import { debounce, onlyNumberValidate } from "../utils/utilFunctions";
import Input from "./Input";

const Converter = () => {
  const [countryCodeData, setCountryCodeData] = useState({});
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(0);
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const [amountToShow, setAmountToShow] = useState("0");

  const calculateAnswer = useCallback(
    async ({
      amountValue = 0,
      toCurrencyValue = "",
      fromCurrencyValue = "",
    }) => {
      const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${
        fromCurrencyValue || fromCurrency
      }&to=${toCurrencyValue || toCurrency}&amount=${amountValue || amount}`;
      const { method, headers } = API_DATA.fetchResult;
      if (!isLoading) {
        setIsLoading(true);
      }
      const res = await fetchData({
        url: url,
        method: method,
        headers: headers,
      });
      setIsLoading(false);
      setResult(res ?? 0);
      setAmountToShow(amountValue || amount);
    },
    [amount, toCurrency, fromCurrency, isLoading]
  );

  const handleSelectFromCurrency = (fromCurrency) => {
    setFromCurrency(fromCurrency);
    calculateAnswer({ fromCurrencyValue: fromCurrency });
  };
  const handleSelectToCurrency = (toCurrency) => {
    setToCurrency(toCurrency);
    calculateAnswer({ toCurrencyValue: toCurrency });
  };
  const handleInverseToandFrom = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    calculateAnswer({
      fromCurrencyValue: toCurrency,
      toCurrencyValue: fromCurrency,
    });
  };

  const handleAmountChange = (event) => {
    let inputVal = event.target.value;
    if (inputVal.indexOf(".") !== 1) {
      inputVal = inputVal.replace(/^0+/, "");
    }
    if (inputVal === "") {
      setAmount("0");
      setResult(0);
      setAmountToShow("0");
    } else if (onlyNumberValidate(inputVal)) {
      setIsLoading(true);
      setAmount(inputVal);
      const fn = debounce(
        () => {
          calculateAnswer({ amountValue: event.target.value });
        },
        timeoutRef,
        500
      );
      fn();
    }
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
        amount={amount}
        isLoading={isLoading}
      />
      <ReactSelect
        label="From"
        id="from"
        currency={
          options[
            options.findIndex(
              (countryData) => countryData.value === fromCurrency
            )
          ]
        }
        handleSelect={handleSelectFromCurrency}
        options={options}
        oppositeCurrency={toCurrency}
      />
      <button className="exchangeBtn" onClick={handleInverseToandFrom}>
        <i className="fa-solid fa-arrow-right-arrow-left"></i>
      </button>
      <ReactSelect
        label="To"
        id="to"
        currency={
          options[
            options.findIndex((countryData) => countryData.value === toCurrency)
          ]
        }
        handleSelect={handleSelectToCurrency}
        options={options}
        oppositeCurrency={fromCurrency}
      />
      <Result
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        result={result}
        countryCodeData={countryCodeData}
        amount={amountToShow.toString()}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Converter;

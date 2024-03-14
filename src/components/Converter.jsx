import { useCallback, useEffect, useReducer } from "react";

import Result from "./Result";
import ReactSelect from "./Select";
import { fetchData } from "../http/fetchDataAPI";
import { API_DATA } from "../utils/constant";
import Input from "./Input";
import { debounce } from "../utils/utilFunctions";
import useLocalStorage from "../hooks/localStorage.jsx";
import { INITIAL_STATE } from "../utils/constant.js";
import { reducer } from "../utils/reducer.js";
import { calcResult } from "../utils/calcResult.js";

const Converter = () => {
  const [userInput, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [options, setOptions] = useLocalStorage("countryCurrencyData", []);

  const calculateCurrency = useCallback(
    async ({
      fromCurrency = userInput.fromCurrency,
      toCurrency = userInput.toCurrency,
      amount = userInput.amount,
    }) => {
      if (amount === "") {
        dispatch({
          type: "updateResult",
          payload: {
            amount: "",
            result: 0,
          },
        });
        return;
      }
      const res = await calcResult(fromCurrency, toCurrency, amount);
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

  const handleDebounce = useCallback(debounce(calculateCurrency, 500), [
    calculateCurrency,
  ]);

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

  const handleSelectToCurrency = useCallback(
    (toCurrency) => {
      dispatch({
        type: "updateToCurrency",
        payload: toCurrency,
      });
      calculateCurrency({ toCurrency: toCurrency });
    },
    [calculateCurrency]
  );

  const handleInverseCurrency = () => {
    dispatch({
      type: "inverseCurrency",
    });

    calculateCurrency({
      fromCurrency: userInput.toCurrency,
      toCurrency: userInput.fromCurrency,
    });
  };

  const makeOptions = useCallback(
    (countryCodeData) => {
      setOptions(
        Object.entries(countryCodeData).map((contryData) => ({
          currencyCode: contryData[0],
          countryCurrencyName: contryData[1],
          flagImage: `https://flagsapi.com/${contryData[0].slice(
            0,
            2
          )}/flat/64.png`,
        }))
      );
    },
    [setOptions]
  );

  const fetchCountryCodeData = useCallback(async () => {
    if (options.length === 0) {
      const { url, method, headers } = API_DATA.fetchCountryCode;
      const res = await fetchData({ url, method, headers });
      makeOptions(res.result);
    }
  }, [makeOptions, options.length]);

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

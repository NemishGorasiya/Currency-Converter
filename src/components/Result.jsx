import PropTypes from "prop-types";
import getSymbolFromCurrency from "currency-symbol-map";
import { addCommasInAmount } from "../utils/utilFunctions";

const Result = (res) => {
  const { result, fromCurrency, toCurrency, amount } = res.result;
  return (
    <div className="result">
      <h3>
        {/* <img
          src={`https://flagsapi.com/${fromCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        /> */}
        <p>{` ${getSymbolFromCurrency(
          fromCurrency.currencyCode
        )} ${addCommasInAmount(amount === "" ? 0 : parseFloat(amount))} ${
          fromCurrency.countryCurrencyName
        } =`}</p>
      </h3>
      <h1>
        {/* <img
          src={`https://flagsapi.com/${toCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        /> */}
        {` ${getSymbolFromCurrency(
          toCurrency.currencyCode
        )} ${addCommasInAmount(result)} ${toCurrency.countryCurrencyName}`}
      </h1>
    </div>
  );
};

Result.propTypes = {
  fromCurrency: PropTypes.string,
  result: PropTypes.object,
  toCurrency: PropTypes.string,
  amount: PropTypes.string,
};
export default Result;

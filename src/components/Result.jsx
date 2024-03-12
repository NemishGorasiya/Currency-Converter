import PropTypes from "prop-types";
import getSymbolFromCurrency from "currency-symbol-map";
import { addCommasInAmount } from "../utils/utilFunctions";

const Result = ({
  fromCurrency,
  countryCodeData,
  result,
  toCurrency,
  amount,
}) => {
  return (
    <div className="result">
      <h3>
        <img
          src={`https://flagsapi.com/${fromCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        />
        <p>{` ${getSymbolFromCurrency(fromCurrency)} ${addCommasInAmount(
          parseFloat(amount)
        )} ${countryCodeData[fromCurrency]} =`}</p>
      </h3>
      <h1>
        <img
          src={`https://flagsapi.com/${toCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        />
        {` ${getSymbolFromCurrency(toCurrency)} ${addCommasInAmount(result)} ${
          countryCodeData[toCurrency]
        }`}
      </h1>
    </div>
  );
};

Result.propTypes = {
  fromCurrency: PropTypes.string,
  countryCodeData: PropTypes.object,
  result: PropTypes.number,
  toCurrency: PropTypes.string,
  amount: PropTypes.string,
};
export default Result;

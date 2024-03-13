import PropTypes from "prop-types";
import getSymbolFromCurrency from "currency-symbol-map";
import { addCommasInAmount } from "../utils/utilFunctions";

const Result = (res) => {
  // console.log("in result");
  const { result, fromCurrency, toCurrency, amount } = res.result;
  return (
    <div className="result">
      <h3>
        {/* <img
          src={`https://flagsapi.com/${fromCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        /> */}
        <p>{` ${getSymbolFromCurrency(fromCurrency)} ${addCommasInAmount(
          parseFloat(amount)
        )} ${fromCurrency} =`}</p>
      </h3>
      <h1>
        {/* <img
          src={`https://flagsapi.com/${toCurrency.slice(0, 2)}/flat/64.png`}
          alt="flag"
        /> */}
        {` ${getSymbolFromCurrency(toCurrency)} ${addCommasInAmount(
          result
        )} ${toCurrency}`}
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

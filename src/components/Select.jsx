import Select from "react-select";
import PropTypes from "prop-types";

const ReactSelect = ({ label, handleSelect, options, userInput }) => {
  const formatOptionLabel = ({ currencyCode, currencyName, flagImage }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        style={{ height: "35px", width: "35px" }}
        src={flagImage}
        alt="flag"
      />
      <div style={{ marginLeft: "6px" }}>
        {currencyName} {`(${currencyCode})`}
      </div>
    </div>
  );

  let ownCurrency;
  let oppositeCurrency;
  // console.log(options);
  // console.log(userInput);
  if (label === "To") {
    ownCurrency =
      options[
        options.findIndex(
          (option) => option.currencyCode === userInput.toCurrency
        )
      ];
    // console.log("own curr", ownCurrency);
    oppositeCurrency = userInput.fromCurrency;
  } else {
    ownCurrency =
      options[
        options.findIndex(
          (option) => option.currencyCode === userInput.fromCurrency
        )
      ];
    oppositeCurrency = userInput.toCurrency;
  }
  // console.log("own curr", ownCurrency);

  return (
    <div className="currencySelect">
      <label>{label}</label>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        formatOptionLabel={formatOptionLabel}
        value={ownCurrency}
        isOptionDisabled={(option) => option.value === oppositeCurrency}
        onChange={(selectedOption) => {
          handleSelect(selectedOption);
        }}
        options={options}
      />
    </div>
  );
};

ReactSelect.propTypes = {
  label: PropTypes.string,
  handleSelect: PropTypes.func,
  options: PropTypes.array,
  userInput: PropTypes.object,
};

export default ReactSelect;

import Select from "react-select";
import PropTypes from "prop-types";

const ReactSelect = ({
  label,
  id,
  currency,
  handleSelect,
  options,
  oppositeCurrency,
}) => {
  const formatOptionLabel = ({ value, label, flagImage }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        style={{ height: "35px", width: "35px" }}
        src={flagImage}
        alt="flag"
      />
      <div style={{ marginLeft: "6px" }}>
        {label} {`(${value})`}
      </div>
    </div>
  );
  return (
    <div className="currencySelect">
      <label htmlFor={id}>{label}</label>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        id={id}
        formatOptionLabel={formatOptionLabel}
        value={currency}
        isOptionDisabled={(option) => option.value === oppositeCurrency}
        onChange={(selectedOption) => {
          handleSelect(selectedOption.value);
        }}
        options={options}
      />
    </div>
  );
};

ReactSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  currency: PropTypes.object,
  handleSelect: PropTypes.func,
  options: PropTypes.array,
  oppositeCurrency: PropTypes.string,
};

export default ReactSelect;

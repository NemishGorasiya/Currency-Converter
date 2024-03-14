import PropTypes from "prop-types";
import { useState } from "react";
import { onlyNumberValidate } from "../utils/utilFunctions";
// import CustomLoader from "../UI/CustomLoader";

const Input = ({ label, id, handleAmountChange }) => {
  const [amount, setAmount] = useState("");
  const handleInput = ({ target: { value } }) => {
    if (onlyNumberValidate(value)) {
      setAmount(value);
      handleAmountChange({ amount: value });
    }
  };
  return (
    <div className="amount">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={amount}
        placeholder="Enter amount"
        onChange={handleInput}
      />

      {/* <div className="loaderWrapper">
          <CustomLoader />
        </div> */}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  handleAmountChange: PropTypes.func,
  userInput: PropTypes.object,
};

export default Input;

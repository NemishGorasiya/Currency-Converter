import PropTypes from "prop-types";
import CustomLoader from "../UI/CustomLoader";

const Input = ({ label, amount, id, handleAmountChange, isLoading }) => {
  return (
    <div className="amount">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={amount}
        placeholder="Enter amount"
        onChange={handleAmountChange}
      />
      {isLoading && (
        <div className="loaderWrapper">
          <CustomLoader />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  amount: PropTypes.string,
  handleAmountChange: PropTypes.func,
};

export default Input;

import PropTypes from "prop-types";

const Input = ({ label, amount, id, handleAmountChange }) => {
  return (
    <div className="amount">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={amount}
        placeholder="Enter amount"
        onChange={handleAmountChange}
      />
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

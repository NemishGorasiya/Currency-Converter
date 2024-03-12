// export const debounce = (func, delay = 500) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

export function debounce(func, timeoutRef, delay = 500) {
  return function (...args) {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const onlyNumberValidate = (input) => {
  const pattern = /^[0-9]*(\.[0-9]{0,2})?$/;
  return pattern.test(input);
};

// formatCurrency("USD").format(134674646);

// export const formatCurrency = (currency) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency,
//   });
// };

export const addCommasInAmount = (amount) => {
  console.log(amount, typeof amount);
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

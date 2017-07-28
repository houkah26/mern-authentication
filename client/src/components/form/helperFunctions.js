// Function to return number of decimals
export const countDecimals = number => {
  if (Math.floor(number) !== number)
    return number.toString().split(".")[1].length || 0;
  return 0;
};

// Returns true if number is a positive integer
export const isPositiveInt = number => {
  return number && number > 0 && Number.isInteger(number);
};

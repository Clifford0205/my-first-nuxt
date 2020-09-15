export default serial => {
  let at_least_8_digits = /^\d{8}$/;

  if (at_least_8_digits.test(serial) == false) {
    return false;
  }

  let num_array = [1, 2, 1, 2, 1, 2, 4, 1];

  let onesAddTens = number => {
    let ones = number % 10;
    let tens = (number - ones) / 10;

    return ones + tens;
  };

  let sum = num_array.reduce((accumlator, currentValue, currentIndex) => {
    let multValue = currentValue * serial[currentIndex];
    let value = onesAddTens(multValue);

    return accumlator + value;
  }, 0);

  return sum % 10 == 0 || ((sum + 1) % 10 == 0 && serial[6] == '7');
};

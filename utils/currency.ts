function getSpecCurrency(
  codeID = "USD",
  currencyValues: Array<{ id: number; code: string; value: number }>
) {
  const oneCurrency = [];
  currencyValues.forEach((currency) => {
    if (currency.code === codeID) {
      oneCurrency.push(currency);
    }
  });
  if (oneCurrency.length > 0) {
    return oneCurrency[0];
  } else {
    [{ id: null, code: "", value: 1 }];
  }
}
export default getSpecCurrency;

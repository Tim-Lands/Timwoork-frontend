import API from "../../config";
async function getData() {
  const data = await API.get("api/currency_values");
  return data;
}
export const CurrencyService = { getData };

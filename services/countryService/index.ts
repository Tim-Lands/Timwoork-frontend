import API from "../../config";
async function getAll() {
  const res = await API.get("api/get_countries");
  return res?.data?.data;
}
async function getWithdrawalAll() {
  const res = await API.get("api/withdrawals/countries");
  return res?.data?.data;
}
export const CountriesService = { getAll, getWithdrawalAll };

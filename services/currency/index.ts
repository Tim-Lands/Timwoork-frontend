import API from "../../config";

async function getData() {
  const data = await API.get("api/new/me/currency");
  return data.data;
}

async function getAll() {
  const res = await API.get("api/currency");
  return res.data.data;
}

async function getAllValues() {
  const res = await API.get("api/currency_values");
  return res.data.data;
}

export const CurrencyService = { getData, getAll, getAllValues };

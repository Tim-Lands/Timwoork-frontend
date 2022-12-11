import API from "../../config";
async function getData() {
  const res = await API.get("api/new/me/wallet");
  return res.data;
}
export const WalletService = { getData };

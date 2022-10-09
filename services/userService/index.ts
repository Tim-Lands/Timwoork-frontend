import API from "../../config";

async function login(username, password) {
  const res = await API.post("api/login", { username, password });
  return res.data;
}
async function checkLogin() {}

const UserService = { login, checkLogin };
export { UserService };

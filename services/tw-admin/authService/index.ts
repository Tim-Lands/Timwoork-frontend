import API from "../../../config";

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await API.post("dashboard/login", { username, password });
  return res?.data;
}

async function checkLogin() {
  const res = await API.get("dashboard/me");
  return res?.data;
}

async function logout() {
  const res = await API.post("dashboard/logout_user");
  return res.data;
}

export const UserService = {
  login,
  checkLogin,
  logout,
};

import API from "../../config";

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await API.post("api/login", { username, password });
  return res?.data;
}
async function checkLogin() {
  const res = await API.get("api/new/me");
  return res?.data;
}
async function loginWithGoogle({
  email,
  first_name,
  last_name,
  full_name,
  avatar,
  provider_id,
  username,
}: {
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
  provider_id: number;
  username: string;
}) {
  const res = await API.post("api/login/google", {
    email,
    first_name,
    last_name,
    full_name,
    avatar,
    provider_id,
    username,
  });
  return res?.data?.data;
}
async function signIn({
  email,
  password,
  password_confirmation,
  username,
  phone,
  code_phone,
}: {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  phone: string;
  code_phone: string;
}) {
  const res = await API.post("api/register", {
    email,
    password,
    password_confirmation,
    username,
    phone,
    code_phone,
  });
  return res?.data?.data;
}
async function logout() {
  const res = await API.post("api/logout_user");
  return res.data;
}
async function logoutAll() {
  const res = await API.post("api/logout_all");
  return res.data;
}
export const UserService = {
  login,
  checkLogin,
  loginWithGoogle,
  signIn,
  logout,
  logoutAll,
};

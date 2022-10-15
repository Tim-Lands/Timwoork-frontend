import API from "../../config";

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await API.post("api/login", { username, password });
  return res.data;
}
async function checkLogin() {
  const res = await API.get("api/new/me");
  return res.data;
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
  return res.data.data;
}
export const UserService = { login, checkLogin, loginWithGoogle };

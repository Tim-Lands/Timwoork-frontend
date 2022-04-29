import Cookies from "js-cookie";
const getToken = () => {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  return;
};

export  { getToken};

import { configureStore } from "@reduxjs/toolkit";
import user from "./user/userSlice";
import blog from "./blog/blogSlice";
import cart from "./cart/cartSlice";
import notifications from "./notifications/notificationsSlice";
import chat from "./chat/chatSlice";
import wallet from "./wallet/walletSlice";
import currency from "./currency/currencySlice";
import languages from "./languages/languagesSlice";
import sales from "./sales/salesSlice";
import profile from "./profile/profileSlice";
import products from "./products/productsSlice";
import purchase from "./purchases/purchasesSlice";
import myServices from "./myServices/myServicesSlice";
export const store = configureStore({
  reducer: {
    user,
    blog,
    cart,
    notifications,
    chat,
    wallet,
    currency,
    languages,
    sales,
    profile,
    products,
    purchase,
    myServices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

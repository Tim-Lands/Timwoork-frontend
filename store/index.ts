import { configureStore } from "@reduxjs/toolkit";
import user from "./user/userSlice";
import blog from "./blog/blogSlice";
import cart from "./cart/cartSlice";
import notifications from "./notifications/notificationsSlice";
import chat from "./chat/chatSlice";
import wallet from "./wallet/walletSlice";
import currency from "./currency/currencySlice";
import languages from "./languages/languagesSlice";
import profile from "./profile/profileSlice";
import products from "./products/productsSlice";
import purchase from "./purchases/purchasesSlice";
import myServices from "./myProducts/myProductsSlice";
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
    profile,
    products,
    purchase,
    myServices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

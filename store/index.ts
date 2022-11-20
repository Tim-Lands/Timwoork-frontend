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
import myProducts from "./myProducts/myProductsSlice";
import mySales from "./sales/salesSlice";
import categories from "./categories/categoriesSlice";
import dashboardUsers  from "./tw-admin/users/userSlice";
import dashboardProducts from './tw-admin/products/productsSlice'
import dashboardWithdrawals from './tw-admin/withdrawals/withdrawalsSlice'
import dashboardActivitiesSlice from "./tw-admin/activities/activitiesSlice";
import dashboardTypespaymentSlice  from "./tw-admin/typesPayment/typesPaymentSlice";
import dashboardBadgesSlice from "./tw-admin/badges/badgesSlice";
import dashboardCountriesSlice from "./tw-admin/countries/countriesSlice";
import dashboardLanguagesSlice from "./tw-admin/languages/languagesSlice";
import dashboardLevelsSlice from "./tw-admin/levels/levelsSlice";
import dashboardSkillsSlice from "./tw-admin/skills/skillsSlice";
import dashboardTagsSlice from "./tw-admin/tags/tagsSlice";
import dashboardCategoriesSlice from "./tw-admin/categories/categoriesSlice";

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
    myProducts,
    mySales,
    categories,
    dashboardUsers,
    dashboardProducts,
    dashboardWithdrawals,
    dashboardActivitiesSlice,
    dashboardTypespaymentSlice,
    dashboardBadgesSlice,
    dashboardCountriesSlice,
    dashboardLanguagesSlice,
    dashboardLevelsSlice,
    dashboardSkillsSlice,
    dashboardTagsSlice,
    dashboardCategoriesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

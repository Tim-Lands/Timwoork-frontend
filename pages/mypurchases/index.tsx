import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import router from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { PurchasesActions } from "store/purchases/purchasesActions";
import Items, { EItemType } from "@/components/items/Items";
function index() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    user,
    purchase: { purchases },
  } = useAppSelector((state) => state);

  const veriedEmail = user.email_verified;
  useEffect(() => {
    if (purchases.loaded) return;
    dispatch(PurchasesActions.getPurchasesData());
  }, [purchases]);
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, []);
  function onChange() {}
  return (
    <>
      <MetaTags
        title={getAll("My_purchases")}
        metaDescription={getAll("My_purchases")}
        ogDescription={getAll("My_purchases")}
      />
      {veriedEmail && (
       <Items onChange={onChange} items = {purchases} itemType = {EItemType.PURCHASES}/>
      )}
    </>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
index.propTypes = {
  ShowItem: PropTypes.any,
  errorItem: PropTypes.bool,
};
export default index;

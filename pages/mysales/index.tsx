import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import router from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { SalesActions } from "store/sales/salesActions";
import Items from "@/components/items/Items";
function index() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    mySales: { sales },
    user,
  } = useAppSelector((state) => state);
  const veriedEmail = user.email_verified;
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    if (sales.loaded) return;
    dispatch(SalesActions.getData());
  }, [sales]);

  function onChange() {}
  return (
    <>
      <MetaTags
        title={getAll("My_sells")}
        metaDescription={getAll("My_sells")}
        ogDescription={getAll("My_sells")}
      />
      {veriedEmail && (
        <Items onChange={onChange} items={sales} itemType={"sales"} />
      )}
    </>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;

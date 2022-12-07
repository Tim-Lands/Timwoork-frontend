import React, { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";

import router from "next/router";
import { PurchasesActions } from "store/purchases/purchasesActions";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Item from "@/components/items/ShowItem";

const Order = ({ id }) => {
  const dispatch = useAppDispatch();

  const {
    user,
    purchase: { onePurchase: ShowItem },
  } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(PurchasesActions.getOnePurchase({ id }))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        console.log(err)
        router.push("/mypurchases");
      });
  }, [id]);


  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);

 
  return (
    <Item id = {id} type={'purchases'} ShowItem={ShowItem}/>
  )
};

export default Order;
Order.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps({ query }) {
  return { props: { id: query.id } };
}
Order.propTypes = {
  id: PropTypes.number,
};

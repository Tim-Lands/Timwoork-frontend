import React, { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";

import router from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SalesActions } from "@/store/sales/salesActions";
import Item from "@/components/items/ShowItem";

const User = ({ query }) => {
  const dispatch = useAppDispatch();
  const {
    mySales: { oneSale: ShowItem },
  } = useAppSelector((state) => state);
  const user = useAppSelector((state) => state.user);


  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    dispatch(SalesActions.getOneSale({ id: query.id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/mysales");
      });
  }, [query.id]);





  return (
    <Item id={query.id} type={'sales'} ShowItem={ShowItem}/>
  )
};

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
User.getInitialProps = async ({ query }) => {
  return { query };
};
User.propTypes = {
  query: PropTypes.any,
};

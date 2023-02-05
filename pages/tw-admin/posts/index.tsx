import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Posts from "@/components/Dashboard/posts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductsActions } from "@/store/tw-admin/products/ProductsActions";
import { EProductStateType } from "@/store/tw-admin/products/thunkFunctions";
function index(): ReactElement {
  const productsState = useAppSelector(state=> state.dashboardProducts)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(ProductsActions.getAll({page, search}))
  },[page, search])
  return (
    <>
      <div className="timlands-panel">
        <Posts postsType={EProductStateType.ALL} postsList={productsState.all} isLoading={productsState.all.loading} onPageChange={setPage} onSearchSubmit={setSearch} />
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;

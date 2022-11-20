import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Posts from "@/components/Dashboard/posts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductsActions } from "@/store/tw-admin/products/ProductsActions";
import { EProductStateType } from "@/store/tw-admin/products/thunkFunctions";
function index(): ReactElement {
  const productsState = useAppSelector((state) => state.dashboardProducts);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  console.log(productsState);
  useEffect(() => {
    dispatch(ProductsActions.getAllPending({ page, search }));
  }, [page, search]);

  return (
    <>
      <div className="timlands-panel">
        <Posts
          postsType={EProductStateType.PENDING}
          postsList={productsState.pending}
          isLoading={productsState.pending.loading}
          onPageChange={setPage}
          onSearchSubmit={setSearch}
        />
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;

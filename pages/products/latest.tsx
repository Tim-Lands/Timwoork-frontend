import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import Pagination from "react-js-pagination";
import Loading from "@/components/Loading";
import { MetaTags } from "@/components/SEO/MetaTags";
import Cookies from "js-cookie";
import API from "../../config";

function Latest() {
  /**----------------------------------------------------------**/
  let token = Cookies.get("token");
  const { getAll } = useAppSelector((state) => state.languages);

  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [size, setSize] = useState(3);
  const [paginationSize, setPaginationSize] = useState(8);

  const [getProducts, setGetProducts]: any = useState();
  //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
  /**---------------------------------------------------------**/
  const fetchData = async (pageNumber: number = 1) => {
    try {
      const res = await API.get(
        `api/filter?paginate=12&page=${pageNumber}&sort[0]=created_at,desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setGetProducts(res.data.data);
      }
    } catch (error) {
      () => {};
    }
  };

  useEffect(() => {
    if (window.innerWidth > 950) {
      setSize(3);
    }
    if (window.innerWidth < 950) {
      setSize(4);
    }
    if (window.innerWidth < 550) {
      setPaginationSize(2);
    }
    if (window.innerWidth > 550) {
      setPaginationSize(8);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 950) {
        setSize(3);
      }
      if (window.innerWidth < 950) {
        setSize(4);
      }
      if (window.innerWidth < 550) {
        setPaginationSize(2);
      }
      if (window.innerWidth > 550) {
        setPaginationSize(8);
      }
    });
    fetchData();
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 950) {
          setSize(3);
        }
        if (window.innerWidth < 950) {
          setSize(4);
        }
        if (window.innerWidth < 550) {
          setPaginationSize(2);
        }
        if (window.innerWidth > 550) {
          setPaginationSize(8);
        }
      });
    };
  }, []);
  return (
    <div className="containerProductsPagePopular py-5">
      <MetaTags
        title={getAll("Newly_added_services")}
        metaDescription={getAll("Newly_added_services")}
        ogDescription={getAll("Newly_added_services")}
      />
      <Formik
        isInitialValid={true}
        initialValues={{
          categoryID: [],
        }}
        onSubmit={async () => {}}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <h4 className="title">{getAll("Newly_added_services")}</h4>
              </div>
              {!getProducts && <Loading />}
              <FilterContent
                size={size}
                products={getProducts && getProducts.data}
              />
              {getProducts && (
                <div>
                  <hr />
                  <Pagination
                    activePage={
                      getProducts.current_page ? getProducts.current_page : 0
                    }
                    itemsCountPerPage={
                      getProducts.per_page ? getProducts.per_page : 0
                    }
                    totalItemsCount={getProducts.total ? getProducts.total : 0}
                    onChange={(pageNumber) => {
                      fetchData(pageNumber);
                    }}
                    pageRangeDisplayed={paginationSize}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText={getAll("First_page")}
                    lastPageText={getAll("Last_page")}
                  />
                </div>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
Latest.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Latest;

import React, { ReactElement, useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";

import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import Pagination from "react-js-pagination";
import Loading from "@/components/Loading";
import { MetaTags } from "@/components/SEO/MetaTags";
import Cookies from "js-cookie";
import API from "../../config";

function Popular() {
  let token = Cookies.get("token");
  const [size, setSize] = useState(3);
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [paginationSize, setPaginationSize] = useState(8);
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const [getProducts, setGetProducts]: any = useState();
  //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
  /**---------------------------------------------------------**/
  const fetchData = async (pageNumber: number = 1) => {
    try {
      const res = await API.get(
        `api/filter?paginate=12&page=${pageNumber}&sort=count_buying,desc`,
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
        title={getAll("Most_popular_services")}
        metaDescription={getAll("Most_popular_services")}
        ogDescription={getAll("Most_popular_services")}
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
                <h4 className="title">{getAll("Most_popular_services")}</h4>
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
Popular.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Popular;

import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import Pagination from "react-js-pagination";
import Loading from "@/components/Loading";
import { MetaTags } from "@/components/SEO/MetaTags";
import { ProductService } from "@/services/productService";

function Popular() {
  const [size, setSize] = useState(3);
  const { getAll } = useAppSelector((state) => state.languages);
  const [paginationSize, setPaginationSize] = useState(8);
  const [getProducts, setGetProducts]: any = useState();
  //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
  /**---------------------------------------------------------**/
  const fetchData = async (pageNumber: number = 1) => {
    try {
      const res = await ProductService.getAll({
        params: { page: pageNumber, sort: "count_buying,desc", paginate: 12 },
      });

      setGetProducts(res);
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
              <FilterContent size={size} products={getProducts?.data} />
              {getProducts && (
                <div>
                  <hr />
                  <Pagination
                    activePage={getProducts.current_page || 0}
                    itemsCountPerPage={getProducts.per_page || 0}
                    totalItemsCount={getProducts.total || 0}
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

import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import Pagination from "react-js-pagination";
import Loading from "@/components/Loading";
import { ProductService } from "@/services/productService";
import { MetaTags } from "@/components/SEO/MetaTags";

function Latest() {
  const { getAll } = useAppSelector((state) => state.languages);
  const [size, setSize] = useState(3);
  const [paginationSize, setPaginationSize] = useState(8);

  const [getProducts, setGetProducts]: any = useState();
  const fetchData = async (pageNumber: number = 1) => {
    try {
      const res = await ProductService.getAll({
        params: {
          page: pageNumber,
          "sort[0]": "created_at,desc",
          paginate: 12,
        },
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
Latest.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Latest;

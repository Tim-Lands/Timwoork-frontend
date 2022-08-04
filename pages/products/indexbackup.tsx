import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import useSWR from "swr";
import API from "../../config";
import Loading from "@/components/Loading";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { setTimeout } from "timers";
import Tags from "@/components/Tags";
import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";
import Cookies from "js-cookie";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function Category() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [size, setSize] = useState(4);
  const [paginationSize, setPaginationSize] = useState(8);
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const { data: getCategories, error }: any = useSWR("api/get_categories");
  const setValue = getCategories && getCategories.data.map((e) => e.id);
  const setLabel = getCategories && getCategories.data.map((e) => e.name_ar);
  const [selectedTags, setSelectedTags]: any = useState([
    getCategories && getCategories.data,
  ]);
  const [getProducts, setGetProducts]: any = useState();
  //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
  /**----------------------------------------------------------**/
  const fetchData = async (pageNumber: number = 1) => {
    try {
      const res = await API.get(`api/filter?paginate=12&page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setGetProducts(res.data.data);
      }
    } catch (error) {
      () => {};
    }
  };
  /********************** price Slider **********************/
  function valuetext(value: number) {
    return `${value}$`;
  }
  // Pricing range from 0 to 1000
  const [priceRange, setpriceRange] = React.useState<number[]>([5, 1000]);
  const minDistance = 50; // minimum distance between any two values of price

  const handleChangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setpriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setpriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };
  /**----------------------------------------------------------**/

  //filter data
  async function filterData() {
    if (selectedTags == 0) {
      getCategoryFiltrPricing();
    } else {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        const res: any = await API.get(
          `api/filter?paginate=12&between=price,${priceRange[0]},${priceRange[1]}&category=${selectedTags}`
        );
        if (res.status === 200) {
          setIsLoading(false);
          setGetProducts(res.data);
          setIsError(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }
  }
  async function getCategoryFiltrPricing() {
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      const res: any = await API.get(
        `api/filter?paginate=12&between=price,${priceRange[0]},${
          priceRange[1]
        }&category=${getCategories && getCategories.data}`
      );
      if (res.status === 200) {
        setIsLoading(false);
        setGetProducts(res.data);
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (window.innerWidth > 950) {
      setSize(4);
    }
    if (window.innerWidth < 950) {
      setSize(6);
    }
    if (window.innerWidth < 550) {
      setPaginationSize(2);
    }
    if (window.innerWidth > 550) {
      setPaginationSize(8);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 950) {
        setSize(4);
      }
      if (window.innerWidth < 950) {
        setSize(6);
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
          setSize(4);
        }
        if (window.innerWidth < 950) {
          setSize(6);
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
  if (!getCategories) return <Loading />;
  if (error) return <div>Error</div>;
  return (
    <div className="containerProductsPage py-5">
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
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
            <div className="col-md-3">
              <div className="filter-search-sidebar">
                <div className="filter-sidebar-title">
                  <h4 className="title">{getAll("Services_filter")}</h4>
                </div>
                <div className="filter-sidebar-panel">
                  <h4 className="title">{getAll("Price_2")}</h4>
                  <div className="timlands-form">
                    {
                      <Slider
                        getAriaLabel={() => "Minimum distance shift"}
                        value={priceRange}
                        valueLabelDisplay="auto"
                        onChange={handleChangeSlider}
                        getAriaValueText={valuetext}
                        max={1000}
                        min={0}
                        step={10}
                        disableSwap
                      />
                    }
                  </div>
                </div>
                <div className="filter-sidebar-panel">
                  <h4 className="title">التصنيف الرئيسي</h4>
                  <Tags
                    values={setValue}
                    labels={setLabel}
                    placeholder={getAll("All_categories")}
                    selected={(selectedTags) => setSelectedTags(selectedTags)}
                  />
                </div>
                <div className="py-3">
                  <button
                    type="submit"
                    className="btn butt-primary butt-sm"
                    onClick={filterData}
                  >
                    {getAll("Services_filter")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="page-header">
                <h4 className="title">{getAll("All_services")}</h4>
              </div>
              <FilterContent
                products={getProducts && getProducts.data}
                isLoading={isLoading}
                size={size}
                isError={isError}
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
                    className="productPagination"
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
Category.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Category;
Category.propTypes = {
  query: PropTypes.any,
};

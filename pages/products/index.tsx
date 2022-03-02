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

function Category() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts]: any = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const { data: getCategories, error }: any = useSWR("api/get_categories");
  const setValue = getCategories && getCategories.data.map((e) => e.id);
  const setLabel = getCategories && getCategories.data.map((e) => e.name_ar);
  const [selectedTags, setSelectedTags]: any = useState([getCategories && getCategories.data]);

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
      console.log(selectedTags.length);
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
          setProducts(res.data.data.data);
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
        `api/filter?paginate=12&between=price,${priceRange[0]},${priceRange[1]}&category=${getCategories && getCategories.data}`
      );
      if (res.status === 200) {
        setIsLoading(false);
        setProducts(res.data.data.data);
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }

  async function getData() {
    setIsLoading(true);
    setIsError(false);
    try {
      const res: any = await API.get(`api/filter?page=${pageIndex}`);
      if (res) {
        setIsLoading(false);
        setProducts(res.data.data.data);
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  if (!getCategories) return <Loading />;
  if (error) return <div>Error</div>;
  return (
    <div className="container py-5">
      <MetaTags
        title={'تصفح الخدمات'}
        metaDescription={'تصفح الخدمات'}
        ogDescription={'تصفح الخدمات'}
      />
      <Formik
        isInitialValid={true}
        initialValues={{
          categoryID: [],
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="col-md-3">
              <div className="filter-search-sidebar">
                <div className="filter-sidebar-title">
                  <h4 className="title">فلترة الخدمات</h4>
                </div>
                <div className="filter-sidebar-panel">
                  <h4 className="title">السعر</h4>
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
                    placeholder="جميع التصنيفات"
                    selected={(selectedTags) => setSelectedTags(selectedTags)}
                  />
                </div>
                <div className="py-3">
                  <button
                    type="submit"
                    className="btn butt-primary butt-sm"
                    onClick={filterData}
                  >
                    فلترة النتائج
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="page-header">
                <h4 className="title">جميع الخدمات</h4>
              </div>
              <FilterContent
                products={products}
                isLoading={isLoading}
                isError={isError}
              />
              {products &&
                products.length !== 0 &&
                products.total > products.per_page && (
                  <div className="p-2 d-flex">
                    <button
                      className="btn butt-sm butt-primary me-auto"
                      onClick={() => setPageIndex(pageIndex + 1)}
                    >
                      الصفحة التالية
                    </button>
                    <button
                      className="btn butt-sm butt-primary"
                      onClick={() => setPageIndex(pageIndex - 1)}
                    >
                      الصفحة السابقة
                    </button>
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

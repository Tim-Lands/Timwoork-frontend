import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppSelector } from "@/store/hooks";
import { CategoriesService } from "@/services/categoriesServices";
import { ProductService } from "@/services/productService";
import { Services } from "@/services/index";
import Pagination from "react-js-pagination";
import { Collapse, Result } from "antd";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";
import router from "next/router";

const MySelect = (props: any) => {
  const [dataTags, setDataTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const getTagsData = async (tag: string) => {
    setIsLoadingTags(true);
    try {
      const res = await Services.getTags(tag);
      setIsLoadingTags(false);
      setDataTags(res);
    } catch (error) {
      setIsLoadingTags(false);
    }
  };
  const handleChange = (value) => {
    props.onChange("tags", value);
  };
  const handleBlur = () => {
    props.onBlur("tags", true);
  };
  return (
    <div
      className="select-tags-form"
      style={{ margin: "1rem 0", position: "relative" }}
    >
      {isLoadingTags && (
        <span className="spinner-border spinner-border-sm" role="status"></span>
      )}
      <CreatableSelect
        id="color"
        options={dataTags}
        onKeyDown={(e: any) => {
          if (e.target.value) {
            getTagsData(e.target.value);
          }
        }}
        isMulti={true}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
    </div>
  );
};
function Category({ products, categories, url_params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const { getAll, language } = useAppSelector((state) => state.languages);

  const [size, setSize] = useState(4);
  const { Panel } = Collapse;

  const [paginationSize, setPaginationSize] = useState(8);

  const [getProducts, setGetProducts]: any = useState(products);
  const [sentinel, setSentinel]: any = useState({ mount: true });
  const [subcategories, setSubCategories]: any = useState({});
  const [subCategoryDisplay, setSubCategoryDisplay]: any = useState({});
  const [activeKeys, setActiveKeys]: any = useState([]);
  const products_type = {
    most_recent: getAll("Recent_services"),
    most_selling: getAll("Top_selling_services"),
    popular: getAll("Most_popular_services"),
  };
  useEffect(() => {
    setGetProducts(products);
  }, [products]);

  useEffect(() => {
    fetchData();
  }, [sentinel]);

  useEffect(() => {
    if (categories) fetchSubCategories();
  }, [categories]);
  useEffect(() => {
    window.addEventListener("scroll", () => setIsSettings(false));
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
  const fetchData = async (pageNumber: number = 1) => {
    setIsLoading(true);
    const {
      minprice,
      query,
      maxprice,
      tags,
      ratting,
      seller_level,
      delevring,
    } = formik.values;
    const tags_filtered = tags.filter((tag) => tag.id).map((tag) => tag.id);
    try {
      const params = {
        paginate: 12,
        page: pageNumber,
        like: `title,${
          query ? query : url_params.query ? url_params.query : ""
        }`,
        between: delevring ? `duration,${delevring}` : null,

        category: url_params.categoryID,
        tags: tags_filtered.length == 0 ? null : tags_filtered.join(","),
        ratings_avg: ratting,
        seller_level,
        subcategories: url_params.subcategoryID,
      };
      const res = await ProductService.getAll({
        params,
        type: url_params.type,
        min_price: minprice,
        max_price: maxprice,
      });
      setGetProducts(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const fetchSubCategories = async () => {
    const promises = [];
    const temp_subCategories = {};
    const temp_subCategoriesDisplay = {};
    categories.forEach((category) =>
      promises.push(CategoriesService.getOne(category.id))
    );
    const sub_categories = await Promise.all(promises);
    sub_categories?.forEach((sub_category) => {
      temp_subCategories[sub_category?.id] = sub_category?.sub_categories;
      temp_subCategoriesDisplay[sub_category?.id] = "none";
    });
    setSubCategories(temp_subCategories);
    setSubCategoryDisplay(temp_subCategoriesDisplay);
  };

  const toggleCateogryDisplay = (id) => {
    setSubCategoryDisplay({
      ...subCategoryDisplay,
      [id]: subCategoryDisplay[id] == "none" ? "display" : "none",
    });
  };
  function valuetext(value: number) {
    return `${value}$`;
  }

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    formik.setFieldValue("maxprice", -1 * newValue[0]);
    formik.setFieldValue("minprice", -1 * newValue[1]);
  };

  const formik = useFormik({
    initialValues: {
      categoryID: [],
      manCat: [],
      maxprice: 1000,
      tags: [],
      minprice: 5,
      query: "",
      ratting: null,
      seller_level: null,
      delevring: null,
      filter: null,
      subcategoryID: null,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async () => {},
  });
  const showStars = (ratecount: any) => {
    const rate = Number(ratecount).toPrecision(1) || 0;
    const xAr: any = [
      {
        id: 1,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 2,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 3,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 4,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 5,
        name: <span className="material-icons-outlined">star</span>,
      },
    ];
    const yAr: any = [
      {
        id: 6,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 7,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 8,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 9,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 10,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
    ];

    const x: number = 5;
    const y: number = x - Number(rate);
    const yut: any = xAr.slice(y);
    if (rate == null) {
      return 0;
    }
    if (y == 0) {
      return yut;
    } else {
      const yut2: any = yAr.slice(-y, x);
      return yut.concat(yut2);
    }
  };
  return (
    <div
      className="containerProductsPage py-5"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("#setting-toggler")) setIsSettings(false);
      }}
    >
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
      />
      <form onSubmit={formik.handleChange}>
        <div className="row">
          <div className="col-md-3">
            <div className="filter-search-sidebar">
              <div className="filter-sidebar-title">
                <h4 className="title">{getAll("Services_filter")}</h4>
              </div>

              <div className="timlands-form">
                <input
                  id="input-query"
                  name="query"
                  placeholder={getAll("Type_your_search")}
                  className={"timlands-inputs"}
                  autoComplete="off"
                  onKeyPress={(e) => {
                    e.which === 13 && e.preventDefault();
                  }}
                  onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    setSentinel({ ...sentinel, mount: true })
                  }
                  onChange={formik.handleChange}
                  value={formik.values.query}
                />
              </div>
              <Collapse
                onChange={(keys) => setActiveKeys(keys)}
                activeKey={activeKeys}
                ghost
                expandIconPosition="right"
              >
                <Panel
                  header={getAll("Price")}
                  key="1"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="filter-sidebar">
                    <div className="timlands-form">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-with-span">
                            <input
                              className="timlands-inputs"
                              name="minprice"
                              type="number"
                              value={formik.values.minprice}
                              onBlur={() =>
                                setSentinel({ ...sentinel, mount: true })
                              }
                              onChange={formik.handleChange}
                            />
                            <span className="label-form">$</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-with-span">
                            <input
                              className="timlands-inputs"
                              name="maxprice"
                              type="number"
                              value={formik.values.maxprice}
                              onBlur={() =>
                                setSentinel({ ...sentinel, mount: true })
                              }
                              onChange={formik.handleChange}
                            />
                            <span className="label-form">$</span>
                          </div>
                        </div>
                      </div>
                      <Slider
                        getAriaLabel={() => "Minimum distance shift"}
                        value={[
                          -1 * formik.values.minprice,
                          -1 * formik.values.maxprice,
                        ]}
                        valueLabelDisplay="auto"
                        onChange={handleChangeSlider}
                        getAriaValueText={valuetext}
                        min={-1000}
                        max={-5}
                        onChangeCommitted={() =>
                          setSentinel({ ...sentinel, mount: true })
                        }
                        step={10}
                        scale={(x) => -x}
                        disableSwap
                      />
                    </div>
                  </div>
                </Panel>
                <Panel
                  header={getAll("Categories")}
                  key="2"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="filter-categories-list">
                    <div className="categories-list-inner">
                      <div className="list-inner">
                        <div
                          className="list-cat-item"
                          onClick={() => {
                            router.push({ pathname: "/products" });
                          }}
                        >
                          <span className="item-cat-label">
                            <span className="material-icons material-icons-outlined"></span>
                            {getAll("All_categories")}
                          </span>
                        </div>
                      </div>

                      {categories?.map((e: any) => (
                        <div className="list-inner" key={e.id}>
                          <div
                            className={`list-cat-item ${
                              subCategoryDisplay[e.id]
                            }ed`}
                            onClick={() => toggleCateogryDisplay(e.id)}
                          >
                            <span className="item-cat-label">
                              <span className="material-icons material-icons-outlined">
                                {e.icon}
                              </span>
                              {e[which(language)]}
                            </span>
                          </div>

                          <div
                            className={`filter-subcategories-list d-${
                              subCategoryDisplay[e.id]
                            }`}
                          >
                            <div
                              className="list-subcat-item"
                              onClick={() => {}}
                            >
                              <Link href={`/products?categoryID=${e.id}`}>
                                <a className="item-cat-label text-black">
                                  {getAll("All")}
                                </a>
                              </Link>
                            </div>
                            {subcategories[e.id]?.map((sub_category) => (
                              <div
                                key={sub_category.id}
                                className="list-subcat-item"
                              >
                                <Link
                                  href={`/products?categoryID=${e.id}&subcategoryID=${sub_category.id}`}
                                >
                                  <a>{sub_category[which(language)]}</a>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Panel>
                <Panel
                  header={getAll("Skills")}
                  key="6"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="tags-list">
                    <div className="categories-list-inner">
                      <MySelect
                        value={formik.values.tags}
                        onChange={formik.setFieldValue}
                        onBlur={() => setSentinel({ ...sentinel, mount: true })}
                      />
                    </div>
                  </div>
                </Panel>
                <Panel
                  header={getAll("Evaluation")}
                  key="3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="clear-icon">
                    <button
                      className="button-clear"
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("ratting", null);
                        setSentinel({ ...sentinel, mount: true });
                      }}
                    >
                      <span className="material-icons material-icons-outlined">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="rate-filters">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formik.values.ratting == 1}
                        name="ratting"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="1"
                        id="ratting-1"
                      />
                      <label className="form-check-label" htmlFor="ratting-1">
                        <span className="rate-stars">
                          <span className="stars-icons">
                            {showStars(1).map((e: any, index: number) => (
                              <span key={e.id + index}>{e.name}</span>
                            ))}
                          </span>
                          <span className="stars-count">(1)</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="ratting"
                        checked={formik.values.ratting == 2}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="2"
                        id="ratting-2"
                      />
                      <label className="form-check-label" htmlFor="ratting-2">
                        <span className="rate-stars">
                          <span className="stars-icons">
                            {showStars(2).map((e: any, index: number) => (
                              <span key={e.id + index}>{e.name}</span>
                            ))}
                          </span>
                          <span className="stars-count">(2)</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formik.values.ratting == 3}
                        name="ratting"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="3"
                        id="ratting-3"
                      />
                      <label className="form-check-label" htmlFor="ratting-3">
                        <span className="rate-stars">
                          <span className="stars-icons">
                            {showStars(3).map((e: any, index: number) => (
                              <span key={e.id + index}>{e.name}</span>
                            ))}
                          </span>
                          <span className="stars-count">(3)</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formik.values.ratting == 4}
                        name="ratting"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="4"
                        id="ratting-4"
                      />
                      <label className="form-check-label" htmlFor="ratting-4">
                        <span className="rate-stars">
                          <span className="stars-icons">
                            {showStars(4).map((e: any, index: number) => (
                              <span key={e.id + index}>{e.name}</span>
                            ))}
                          </span>
                          <span className="stars-count">(4)</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formik.values.ratting == 5}
                        name="ratting"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="5"
                        id="ratting-5"
                      />
                      <label className="form-check-label" htmlFor="ratting-5">
                        <span className="rate-stars">
                          <span className="stars-icons">
                            {showStars(5).map((e: any, index: number) => (
                              <span key={e.id + index}>{e.name}</span>
                            ))}
                          </span>
                          <span className="stars-count">(5)</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </Panel>
                <Panel
                  header={getAll("Delivery_term")}
                  key="4"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="clear-icon">
                    <button
                      className="button-clear"
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("delevring", null);
                        setSentinel({ ...sentinel, mount: true });
                      }}
                    >
                      <span className="material-icons material-icons-outlined">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="rate-filters">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="delevring"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="1,7"
                        checked={formik.values.delevring == "1,7"}
                        id="delevring-1"
                      />
                      <label className="form-check-label" htmlFor="delevring-1">
                        {getAll("Less_than_a")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="delevring"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="7,14"
                        id="delevring-2"
                        checked={formik.values.delevring == "7,14"}
                      />
                      <label className="form-check-label" htmlFor="delevring-2">
                        {getAll("From_1_to")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="delevring"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="14,30"
                        id="delevring-3"
                        checked={formik.values.delevring == "14,30"}
                      />
                      <label className="form-check-label" htmlFor="delevring-3">
                        {getAll("From_2_weeks")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="delevring"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="30,90"
                        checked={formik.values.delevring == "30,90"}
                        id="delevring-4"
                      />
                      <label className="form-check-label" htmlFor="delevring-4">
                        {getAll("From_1_month")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="delevring"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="90,1000"
                        checked={formik.values.delevring == "90,1000"}
                        id="delevring-5"
                      />
                      <label className="form-check-label" htmlFor="delevring-5">
                        {getAll("More_than_3")}
                      </label>
                    </div>
                  </div>
                </Panel>
                <Panel
                  header={getAll("Seller")}
                  key="5"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    marginBottom: 6,
                  }}
                >
                  <div className="clear-icon">
                    <button
                      className="button-clear"
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("seller_level", null);
                        setSentinel({ ...sentinel, mount: true });
                      }}
                    >
                      <span className="material-icons material-icons-outlined">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="rate-filters">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="seller_level"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="1"
                        checked={formik.values.seller_level == 1}
                        id="sellerBadge-1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sellerBadge-1"
                      >
                        {getAll("Featured_seller")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="seller_level"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="2"
                        checked={formik.values.seller_level == 2}
                        id="sellerBadge-2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sellerBadge-2"
                      >
                        {getAll("VIP_seller")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="seller_level"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSentinel({ ...sentinel, mount: true });
                        }}
                        value="3"
                        checked={formik.values.seller_level == 3}
                        id="sellerBadge-3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sellerBadge-3"
                      >
                        {getAll("New_seller")}
                      </label>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
          <div className="col-md-9">
            <div className="page-header flex-center" style={{ paddingTop: 0 }}>
              <h4 className="title me-auto">
                {products_type[url_params?.type] || getAll("All_services")}
              </h4>
              <div className="tool-right ml-auto">
                <button
                  type="button"
                  id="setting-toggler"
                  className={
                    "btn-tool flex-center " + (isSettings ? "is-active" : "")
                  }
                  onClick={() => setIsSettings(!isSettings)}
                >
                  <span className="material-icons material-icons-outlined">
                    settings
                  </span>
                </button>
                {isSettings && (
                  <div className="tool-menus">
                    <ul className="listmenu-sort ">
                      <li>
                        <button
                          type="button"
                          className="btn-item"
                          onClick={() => {
                            router.push({
                              pathname: "/products",
                              query: { ...url_params, type: "popular" },
                            });
                          }}
                        >
                          {getAll("Most_popular")}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn-item"
                          onClick={() => {
                            router.push({
                              pathname: "/products",
                              query: { ...url_params, type: "most_selling" },
                            });
                          }}
                        >
                          {getAll("Top_selling")}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn-item"
                          onClick={() => {
                            router.push({
                              pathname: "/products",
                              query: { ...url_params, type: "most_recent" },
                            });
                          }}
                        >
                          {getAll("Recently_added")}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn-item"
                          onClick={() => {
                            router.push({
                              pathname: "/products",
                              query: { ...url_params, type: null },
                            });
                          }}
                        >
                          {getAll("Not_classified")}
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <FilterContent
              products={getProducts && getProducts.data}
              isLoading={isLoading}
              size={size}
            />
            {getProducts && getProducts.data == null && (
              <Result
                status="404"
                title={getAll("No_data")}
                subTitle={getAll("There_are_no")}
              />
            )}
            {getProducts && (
              <div>
                <hr />
                <Pagination
                  activePage={
                    getProducts.current_page ? getProducts.current_page : 0
                  }
                  itemsCountPerPage={
                    getProducts.per_page ? Number(getProducts.per_page) : 0
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
      </form>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  try {
    const query_params = {
      paginate: 12,
      page: query.pageNumber,
      category: query.categoryID,
      subcategories: query.subcategoryID,
      query: query.query,
    };

    const [products, categories] = await Promise.all([
      ProductService.getAll({ type: query.type, params: query_params }),
      CategoriesService.getAll(),
    ]);

    return {
      props: {
        products: products,
        categories,
        url_params: query,
        errorFetch: false,
      },
    };
  } catch (error) {
    return {
      props: {
        errorFetch: true,
      },
    };
  }
}
Category.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Category;
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
Category.propTypes = {
  query: PropTypes.any,
  products: PropTypes.any,
  categories: PropTypes.any,
  url_params: PropTypes.any,
};

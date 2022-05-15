import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { useFormik } from "formik";
import useSWR from "swr";
import API from "../../config";
import Loading from "@/components/Loading";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { setTimeout } from "timers";
import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";
import Cookies from "js-cookie";
import { Collapse } from "antd";
import { Alert } from "@/components/Alert/Alert";
import CreatableSelect from 'react-select/creatable';

const MySelect = (props: any) => {
    const [dataTags, setDataTags] = useState([])
    const [isLoadingTags, setIsLoadingTags] = useState(false)
    const getdataTags = async (tag: string) => {
        setIsLoadingTags(true)
        try {
            const res: any = await API.get(`api/tags/filter?tag=${tag}`)
            if (res.status === 200) {
                setIsLoadingTags(false)
                setDataTags(res.data.data.data);
                console.log(res.data.data.data);
            }
        } catch (error) {
            setIsLoadingTags(false)
        }
    }
    const handleChange = value => {
        props.onChange('tags', value);
    };
    const handleBlur = () => {
        props.onBlur('tags', true);
    };
    return (
        <div className='select-tags-form' style={{ margin: '1rem 0', position: 'relative' }}>
            {isLoadingTags && <span className="spinner-border spinner-border-sm" role="status"></span>}
            <CreatableSelect
                id="color"
                options={dataTags}
                onKeyDown={(e: any) => {
                    if (e.target.value) {
                        getdataTags(e.target.value)
                    }
                }}
                isMulti={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
            />
        </div>
    )
}
function Category() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

    const [size, setSize] = useState(4);
    const { Panel } = Collapse;

    const [paginationSize, setPaginationSize] = useState(8);
    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");

    const { data: getCategories, error }: any = useSWR("api/get_categories");
    const [validationsGeneral, setValidationsGeneral]: any = useState({});
    const [getProducts, setGetProducts]: any = useState();
    //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
    /**----------------------------------------------------------**/
    const fetchData = async (pageNumber: number = 1) => {
        setIsLoading(true)
        try {
            const res = await API.get(`api/filter?paginate=12&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setGetProducts(res.data.data);
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
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
    }, [])
    const { data: categories }: any = useSWR('api/get_categories')
    const formik = useFormik({
        initialValues: {
            categoryID: [],
            manCat: [],
            maxprice: 0,
            tags: [],
            minprice: 0,
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                const res = await API.post(`api/filter?paginate=12`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    console.log('success');
                }
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setValidationsGeneral(error.response.data);
                }
            }

        }
    });
    const showStars = (ratecount: any) => {
        const rate =
            Number(ratecount).toPrecision(1) || 0;
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
        <div className="containerProductsPage py-5">
            <MetaTags
                title={"تصفح الخدمات"}
                metaDescription={"تصفح الخدمات"}
                ogDescription={"تصفح الخدمات"}
            />
            <form onSubmit={formik.handleChange}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="filter-search-sidebar">
                            <div className="filter-sidebar-title">
                                <h4 className="title">فلترة الخدمات</h4>
                            </div>
                            {validationsGeneral.msg && (
                                <Alert type="error">{validationsGeneral.msg}</Alert>
                            )}
                            <Collapse ghost expandIconPosition='right'>
                                <Panel header="الفلترة حسب السعر" key="1">
                                    <div className="filter-sidebar">
                                        <div className="timlands-form">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-with-span">
                                                        <input
                                                            className="timlands-inputs"
                                                            name="maxprice"
                                                            type="number"
                                                            value={formik.values.maxprice}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span className="label-form">$</span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-with-span">
                                                        <input
                                                            className="timlands-inputs"
                                                            name="minprice"
                                                            type="number"
                                                            value={formik.values.minprice}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span className="label-form">$</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Slider
                                                getAriaLabel={() => "Minimum distance shift"}
                                                value={priceRange}
                                                valueLabelDisplay="auto"
                                                onChange={handleChangeSlider}
                                                getAriaValueText={valuetext}
                                                max={formik.values.maxprice}
                                                min={formik.values.minprice}
                                                step={10}
                                                disableSwap
                                            />
                                        </div>
                                    </div>
                                </Panel>
                                <Panel style={{ padding: 0 }} header="الفلترة حسب التصنيفات" key="2">
                                    <div className="filter-categories-list">
                                        <div className="categories-list-inner">
                                            {/* يمكن تحتاجها <Loading size="sm"/> */}
                                            {categories && categories.data.map((e: any) => (
                                                <div className="list-inner" key={e.id}>

                                                    <div className="list-cat-item">
                                                        <span className="item-cat-label">
                                                            <span className="material-icons material-icons-outlined">{e.icon}</span>{e.name_ar}
                                                        </span>
                                                    </div>

                                                    <div className="filter-subcategories-list">
                                                        <div className="list-subcat-item">
                                                            التصنيف الفرعي
                                                        </div>
                                                        <div className="list-subcat-item">
                                                            التصنيف الفرعي
                                                        </div>
                                                        <div className="list-subcat-item">
                                                            التصنيف الفرعي
                                                        </div>
                                                        <div className="list-subcat-item">
                                                            التصنيف الفرعي
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </Panel>
                                <Panel style={{ padding: 0 }} header="الفلترة حسب المهارات" key="6">
                                    <div className="tags-list">
                                        <div className="categories-list-inner">
                                            <MySelect
                                                value={formik.values.tags}
                                                onChange={formik.setFieldValue}
                                                onBlur={formik.setFieldTouched}
                                            />
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="الفلترة حسب التقييم" key="3">
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" value="1" id="ratting-1" />
                                            <label className="form-check-label" htmlFor="ratting-1">
                                                <span className="rate-stars">
                                                    <span className="stars-icons">
                                                        {showStars(1).map((e: any) => (
                                                            <span key={e.id}>{e.name}</span>
                                                        ))}
                                                    </span>
                                                    <span className="stars-count">
                                                        (1)
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" value="2" id="ratting-2" />
                                            <label className="form-check-label" htmlFor="ratting-2">
                                                <span className="rate-stars">
                                                    <span className="stars-icons">
                                                        {showStars(2).map((e: any) => (
                                                            <span key={e.id}>{e.name}</span>
                                                        ))}
                                                    </span>
                                                    <span className="stars-count">
                                                        (2)
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" value="3" id="ratting-3" />
                                            <label className="form-check-label" htmlFor="ratting-3">
                                                <span className="rate-stars">
                                                    <span className="stars-icons">
                                                        {showStars(3).map((e: any) => (
                                                            <span key={e.id}>{e.name}</span>
                                                        ))}
                                                    </span>
                                                    <span className="stars-count">
                                                        (3)
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" value="4" id="ratting-4" />
                                            <label className="form-check-label" htmlFor="ratting-4">
                                                <span className="rate-stars">
                                                    <span className="stars-icons">
                                                        {showStars(4).map((e: any) => (
                                                            <span key={e.id}>{e.name}</span>
                                                        ))}
                                                    </span>
                                                    <span className="stars-count">
                                                        (4)
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" value="5" id="ratting-5" />
                                            <label className="form-check-label" htmlFor="ratting-5">
                                                <span className="rate-stars">
                                                    <span className="stars-icons">
                                                        {showStars(5).map((e: any) => (
                                                            <span key={e.id}>{e.name}</span>
                                                        ))}
                                                    </span>
                                                    <span className="stars-count">
                                                        (5)
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="الفلترة حسب مدة التسليم" key="4">
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" value="1" id="delevring-1" />
                                            <label className="form-check-label" htmlFor="delevring-1">أقل من أسبوع</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" value="2" id="delevring-2" />
                                            <label className="form-check-label" htmlFor="delevring-2">من 1 إلى 2 أسابيع</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" value="3" id="delevring-3" />
                                            <label className="form-check-label" htmlFor="delevring-3">من 2 أسابيع إلى شهر</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" value="4" id="delevring-4" />
                                            <label className="form-check-label" htmlFor="delevring-4">من شهر إلى 3 أشهر</label>
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="الفلترة حسب البائع" key="5">
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sellerBadge" value="1" id="sellerBadge-1" />
                                            <label className="form-check-label" htmlFor="sellerBadge-1">بائع مميز</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sellerBadge" value="2" id="sellerBadge-2" />
                                            <label className="form-check-label" htmlFor="sellerBadge-2">بائع VIP</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sellerBadge" value="3" id="sellerBadge-3" />
                                            <label className="form-check-label" htmlFor="sellerBadge-3">بائع جديد</label>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>

                            <div className="py-3">
                                <button
                                    type="submit"
                                    className="btn butt-primary butt-sm"
                                >
                                    فلترة النتائج
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="page-header flex-center">
                            <h4 className="title me-auto">جميع الخدمات</h4>
                            <div className="tool-right ml-auto">
                                <button type="button" className={"btn-tool flex-center " + (isSettings ? 'is-active' : '')} onClick={() => setIsSettings(!isSettings)}>
                                    <span className="material-icons material-icons-outlined">
                                        settings
                                    </span>
                                </button>
                                {isSettings &&
                                    <div className="tool-menus">
                                        <ul className="listmenu-sort">
                                            <li>
                                                <button type="button" className="btn-item">
                                                    الأكثر شعبية
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn-item">
                                                    الأكثر مبيعا
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn-item">
                                                    المضافة حديثا
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        {!getCategories && <Loading />}
                        {error && <div>Error</div>}
                        <FilterContent
                            products={getProducts && getProducts.data}
                            isLoading={isLoading}
                            size={size}
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
                                    firstPageText={"الصفحة الأولى"}
                                    lastPageText={"الصفحة الأخيرة"}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </form>
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

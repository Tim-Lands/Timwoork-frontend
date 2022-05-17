import React, { ReactElement, useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { useFormik } from "formik";
import useSWR from "swr";
import API from "../../config";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";
import Cookies from "js-cookie";
import { Collapse, Result } from "antd";
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

    const { data: categories }: any = useSWR("api/get_categories");
    const [validationsGeneral, setValidationsGeneral]: any = useState({});
    const [getProducts, setGetProducts]: any = useState([]);
    const [sentinel, setSentinel]: any = useState({ mount: true })
    const [subcategories, setSubCategories]: any = useState({})
    const [subCategoryDisplay, setSubCategoryDisplay]: any = useState({})
    const [isSubCategoryFetched, setIsSubCategoryFetched]: any = useState(false)
    const [activeKeys, setActiveKeys]: any = useState([])
    const [filterBased, setFilterBased]: any = useState('')
    const products_type = useRef({
        'most_recent': 'الخدمات الأحدث',
        'most_selling': 'الخدمات الأكثر مبيعًا',
        'popular': 'الخدمات الأكثر شعبية'
    })
    //const { data: getProducts }: any = useSWR(`api/filter?paginate=12&sort=count_buying,desc`);
    /**----------------------------------------------------------**/
    useEffect(() => {
        if (isSubCategoryFetched) {
            const { categoryID, type } = getQueryParams(window.location.search);
            if (categoryID) {
                setActiveKeys(activeKeys.concat([2]))
                setSubCategoryDisplay({ ...subCategoryDisplay, [categoryID]: 'block' })
            }
            if (type) {
                setFilterBased(type)
            }
        }
    }, [isSubCategoryFetched]);
    useEffect(() => {
        fetchData()
    }, [sentinel, filterBased])

    useEffect(() => {
        if (categories?.data)
            fetchSubCategories()
    }, [categories])
    useEffect(() => {
        window.addEventListener('scroll', () => setIsSettings(false))
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
    }, [])
    const fetchData = async (pageNumber: number = 1) => {
        console.log(formik.values)
        setIsLoading(true)
        const { minprice, query, maxprice, categoryID, tags,subcategoryID, ratting, seller_level, delevring } = formik.values
        const tags_filtered = tags.filter(tag => tag.id).map(tag => tag.id)
        try {
            const params = {
                paginate: 12,
                page: pageNumber,
                like: `title,${query}`,
                between: delevring ? `duration,${delevring}` : null,
                category: categoryID.length == 0 ? null : categoryID.join(','),
                tags: tags_filtered.length == 0 ? null : tags_filtered.join(','),
                ratings_avg: ratting,
                seller_level,
                subcategories:subcategoryID
            }
            const res = await API.get(`api/filter?${filterBased}&between=price,${minprice},${maxprice}`, {
                params,
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
    const fetchSubCategories = async () => {
        const promises = []
        const temp_subCategories = {}
        const temp_subCategoriesDisplay = {}
        categories?.data.forEach(category => promises.push(API.get(`api/get_categories/${category.id}`)))
        const sub_categories = await Promise.all(promises)
        sub_categories.forEach(sub_category => {
            temp_subCategories[sub_category.data.data.id] = sub_category.data.data.sub_categories
            temp_subCategoriesDisplay[sub_category.data.data.id] = 'none'
        })
        setSubCategories(temp_subCategories)
        setSubCategoryDisplay(temp_subCategoriesDisplay)
        setIsSubCategoryFetched(true)
    }

    const toggleCateogryDisplay = (id) => {
        setSubCategoryDisplay({
            ...subCategoryDisplay,
            [id]: subCategoryDisplay[id] == 'none' ? 'display' : 'none'
        })
    }
    /********************** price Slider **********************/
    function valuetext(value: number) {
        return `${value}$`;
    }
    // Pricing range from 0 to 1000
    //const minDistance = 50; // minimum distance between any two values of price



    const handleChangeSlider = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        console.log(newValue)
        if (activeThumb === 0) {
            /*setpriceRange([
                Math.min(newValue[0], priceRange[1] - minDistance),
                priceRange[1],
            ]);*/
        } else {
            /*setpriceRange([
                priceRange[0],
                Math.max(newValue[1], priceRange[0] + minDistance),
            ]);*/

        }
        formik.setFieldValue('maxprice', -1 * newValue[0])
        formik.setFieldValue('minprice', -1 * newValue[1])
        console.log(formik.values)
    }


    const getQueryParams = query => {
        return query
            ? (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params, param) => {
                    const [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
                )
            : {}
    };
    //const { data: categories }: any = useSWR('api/get_categories')
    const formik = useFormik({
        initialValues: {
            categoryID: [],
            manCat: [],
            maxprice: 1000,
            tags: [],
            minprice: 5,
            query: '',
            ratting: null,
            seller_level: null,
            delevring: null,
            filter: null,
            subcategoryID:null
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
        <div className="containerProductsPage py-5" onClick={e => {
            const target = e.target as HTMLElement
            if (!target.closest('#setting-toggler'))
                setIsSettings(false)

        }}>
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

                            <div className="timlands-form">
                                <input
                                    id="input-query"
                                    name="query"
                                    placeholder="أكتب كلمة البحث..."
                                    className={"timlands-inputs"}
                                    autoComplete="off"
                                    onKeyPress={e => { e.which === 13 && e.preventDefault() }}
                                    onKeyDown={e => e.keyCode === 13 && setSentinel({ ...sentinel, mount: true })}
                                    onChange={formik.handleChange}
                                    value={formik.values.query}
                                />
                            </div>
                            <Collapse onChange={(keys) => setActiveKeys(keys)} activeKey={activeKeys} ghost expandIconPosition='right'>

                                <Panel header="السعر" key="1" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }} >

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
                                                            onBlur={() => setSentinel({ ...sentinel, mount: true })}
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
                                                            onBlur={() => setSentinel({ ...sentinel, mount: true })}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span className="label-form">$</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Slider
                                                getAriaLabel={() => "Minimum distance shift"}
                                                value={[-1 * formik.values.minprice, -1 * formik.values.maxprice]}
                                                valueLabelDisplay="auto"
                                                onChange={handleChangeSlider}
                                                getAriaValueText={valuetext}
                                                min={-1000}
                                                max={-5}
                                                onChangeCommitted={() => setSentinel({ ...sentinel, mount: true })}
                                                step={10}
                                                scale={x => -x}
                                                disableSwap
                                            />
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="التصنيفات" key="2" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }}>

                                    <div className="filter-categories-list">
                                        <div className="categories-list-inner">
                                            <div className="list-inner">
                                                <div className="list-cat-item" onClick={() => {
                                                    formik.setFieldValue('categoryID', [])
                                                    setSentinel({ ...sentinel, mount: true })
                                                }}>
                                                    <span className="item-cat-label">
                                                        <span className="material-icons material-icons-outlined"></span>جميع التصنيفات
                                                    </span>
                                                </div>
                                            </div>
                                            {/* يمكن تحتاجها <Loading size="sm"/> */}

                                            {categories && categories.data.map((e: any) => (
                                                <>

                                                    <div className="list-inner" key={e.id}>

                                                        <div className={`list-cat-item ${subCategoryDisplay[e.id]}ed`} onClick={() => toggleCateogryDisplay(e.id)}>
                                                            <span className="item-cat-label">
                                                                <span className="material-icons material-icons-outlined">{e.icon}</span>{e.name_ar}
                                                            </span>
                                                        </div>

                                                        <div className={`filter-subcategories-list d-${subCategoryDisplay[e.id]}`}>
                                                            <div className="list-subcat-item" onClick={() => {
                                                                console.log('clicked')
                                                                formik.setFieldValue('categoryID', [e.id])
                                                                formik.setFieldValue('subcategoryID',null)
                                                                setSentinel({ ...sentinel, mount: true })
                                                            }}>
                                                                الجميع
                                                            </div>
                                                            {subcategories[e.id]?.map(sub_category => (
                                                                <div key={sub_category.id} onClick={()=>{
                                                                    formik.setFieldValue('subcategoryID',sub_category.id)
                                                                    setSentinel({...sentinel,mount:true})
                                                                }} className="list-subcat-item">
                                                                    {sub_category.name_ar}
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </>
                                            ))}

                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="المهارات" key="6" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }}>

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
                                <Panel header="التقييم" key="3" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }}>
                                    <div className="clear-icon">
                                        <button className="button-clear" type="button" onClick={() => {
                                            formik.setFieldValue('ratting', null)
                                            setSentinel({ ...sentinel, mount: true })
                                        }}>
                                            <span className="material-icons material-icons-outlined">close</span>
                                        </button>
                                    </div>
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ratting" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="1" id="ratting-1" />
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
                                            <input className="form-check-input" type="radio" name="ratting" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="2" id="ratting-2" />
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
                                            <input className="form-check-input" type="radio" name="ratting" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="3" id="ratting-3" />
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
                                            <input className="form-check-input" type="radio" name="ratting" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="4" id="ratting-4" />
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
                                            <input className="form-check-input" type="radio" name="ratting" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="5" id="ratting-5" />
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
                                <Panel header="مدة التسليم" key="4" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }}>
                                    <div className="clear-icon">
                                        <button className="button-clear" type="button" onClick={() => {
                                            formik.setFieldValue('delevring', null)
                                            setSentinel({ ...sentinel, mount: true })
                                        }}>
                                            <span className="material-icons material-icons-outlined">close</span>
                                        </button>
                                    </div>
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="1,7" checked={formik.values.delevring == '1,7'} id="delevring-1" />
                                            <label className="form-check-label" htmlFor="delevring-1">أقل من أسبوع</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="7,14" id="delevring-2" checked={formik.values.delevring == '7,14'} />
                                            <label className="form-check-label" htmlFor="delevring-2">من 1 إلى 2 أسابيع</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="14,30" id="delevring-3" checked={formik.values.delevring == '14,30'} />
                                            <label className="form-check-label" htmlFor="delevring-3">من 2 أسابيع إلى شهر</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="30,90" checked={formik.values.delevring == '30,90'} id="delevring-4" />
                                            <label className="form-check-label" htmlFor="delevring-4">من شهر إلى 3 أشهر</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="delevring" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="90,1000" checked={formik.values.delevring == '90,1000'} id="delevring-4" />
                                            <label className="form-check-label" htmlFor="delevring-4">أكثر من 3 أشهر</label>
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="البائع" key="5" style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 6 }}>
                                    <div className="clear-icon">
                                        <button className="button-clear" type="button" onClick={() => {
                                            formik.setFieldValue('seller_level', null)
                                            setSentinel({ ...sentinel, mount: true })
                                        }}>
                                            <span className="material-icons material-icons-outlined">close</span>
                                        </button>
                                    </div>
                                    <div className="rate-filters">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="seller_level" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="1" checked={formik.values.seller_level == 1} id="sellerBadge-1" />
                                            <label className="form-check-label" htmlFor="sellerBadge-1">بائع مميز</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="seller_level" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="2" checked={formik.values.seller_level == 2} id="sellerBadge-2" />
                                            <label className="form-check-label" htmlFor="sellerBadge-2">بائع VIP</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="seller_level" onChange={(e) => {
                                                formik.handleChange(e);
                                                setSentinel({ ...sentinel, mount: true })
                                            }} value="3" checked={formik.values.seller_level == 3} id="sellerBadge-3" />
                                            <label className="form-check-label" htmlFor="sellerBadge-3">بائع جديد</label>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="page-header flex-center" style={{ paddingTop: 0 }}>
                            <h4 className="title me-auto">{products_type.current[filterBased] || 'جميع الخدمات'}</h4>
                            <div className="tool-right ml-auto">
                                <button type="button" id="setting-toggler" className={"btn-tool flex-center " + (isSettings ? 'is-active' : '')} onClick={() => setIsSettings(!isSettings)}>
                                    <span className="material-icons material-icons-outlined">
                                        settings
                                    </span>
                                </button>
                                {isSettings &&
                                    <div className="tool-menus">
                                        <ul className="listmenu-sort " >
                                            <li>
                                                <button type="button" className="btn-item" onClick={() => {
                                                    setFilterBased('popular')
                                                }}>
                                                    الأكثر شعبية
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn-item" onClick={() => {
                                                    setFilterBased('most_selling')

                                                }}>
                                                    الأكثر مبيعا
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn-item" onClick={() => {
                                                    setFilterBased('most_recent')

                                                }}>
                                                    المضافة حديثا
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn-item" onClick={() => {
                                                    setFilterBased('')
                                                    setSentinel({ ...sentinel, mount: true })

                                                }}>
                                                    بدون ترتيب
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>                        
                        <FilterContent
                            products={getProducts && getProducts.data}
                            isLoading={isLoading}
                            size={size}
                        />
                        {getProducts && getProducts.data == null &&
                            <Result
                                status='404'
                                title="لاتوجد بيانات"
                                subTitle="لاتوجد خدمات في هذه الحالة يرجى اعادة المحاولة"
                            />
                        }
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

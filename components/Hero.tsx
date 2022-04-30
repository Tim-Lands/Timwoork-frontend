import React, { useRef, useState } from 'react'
//import HeroSearch from './HeroSearch'
import API from '../config'
import { motion, useAnimation } from 'framer-motion'
import PostSearch from './Post/PostSearch';
import { useOutsideAlerter } from './useOutsideAlerter'
import { Result } from 'antd';
//import Typical from 'react-typical';
import bgIMG from '../styles/5313770.jpg'
import heroIMG from '../public/hero2.png'
import Image from 'next/image'

export function LoadingSearch() {
    return (
        <div className="d-flex justify-content-center search-loading">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
export function NotFountSearch() {
    return (
        <Result
            status="warning"
            title="لا توجد نتائج"
            subTitle="لاتوجد نتائج لعرضها يرجى إعادة المحاولة"
        />
    )
}

function Hero() {
    const controlsParent = useAnimation();
    const controls = useAnimation();
    const [isSearch, setIsSearch] = useState(false)
    const [getSearchs, setGetSearchs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    console.log(getSearchs)
    async function getDataFilter(query: string) {
        setIsLoading(true)
        try {
            const res: any = await API.get(`api/filter?paginate=4&like=title,${query}`)
            if (res) {
                setIsLoading(false)
                setGetSearchs(res.data.data.data)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const setHideExploreHandle = () => {
        setIsSearch(false)
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setHideExploreHandle);

    const onKeyUpHandle = (event: any) => {
        const keyword = event.target.value;
        if (keyword == '') {
            hiddenOnBlurSearch();
            setIsSearch(false)
        } else {
            animateOnSearch();
            setIsSearch(true)
            getDataFilter(keyword)
        }
    }

    // Hide Image Hero on keyup keyword
    const animateOnSearch = () => {
        controlsParent.start({
            height: 0,
            opacity: 0,
            transition: { duration: 0.57, delay: 0.1 },
        })
        controls.start({
            y: -270,
            opacity: 0,
            transition: { duration: 0.61, delay: 0.1 },
        })
    }

    // Show Image Hero if empty keyword
    const hiddenOnBlurSearch = () => {
        controlsParent.start({
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.61, delay: 0.1 },
        })
        controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.57, delay: 0.1 },
        })
    }

    return (
        <div className="timlands-hero" style={{
            backgroundImage: `url(${bgIMG})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="timlands-hero-inner" style={{
                paddingBlock: 20,
                paddingInline: 0,
                textAlign: 'center',
            }}>
                <motion.div style={{ paddingBlock: 7, overflow: 'hidden' }} className="timlands-hero-image">
                    <Image src={heroIMG} placeholder="blur" />
                </motion.div>
                <div style={{ overflow: 'hidden' }} className="timlands-hero-content">
                    <motion.h1 transition={{ duration: 0.69 }} initial={{ y: -150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="main-title">
                        اشتري. دردش .بيع
                    </motion.h1>
                    <motion.h1 transition={{ duration: 0.69 }} initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sub-title">
                        اكتشف سوق تيم ورك للخدمات الالكترونية الأكثر تطورا وراحة
                    </motion.h1>
                </div>
                <div className="timlands-hero-search">
                    <div className="rel-search">
                        <input type="text" onKeyUp={onKeyUpHandle} placeholder="البحث في تيم ورك..." className="timlands-inputs" style={{
                            border: '1px solid #ddd',
                            backgroundColor: '#fff',
                            paddingBlock: 10,
                            paddingInline: 20,
                            fontSize: 13,
                            display: 'block',
                            borderRadius: 6,
                            outline: 'none',
                            width: '100%',
                        }} />
                        {!isLoading && <button className="search-btn">
                            <span className="material-icons material-icons-outlined">search</span>
                        </button>}
                        {isLoading && <button className="search-btn">
                            <span className="spinner-border text-secondary spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>}
                        {isSearch && <motion.div ref={wrapperRef} initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.57, delay: 0.74 }} className="res-search-container">
                            <div className="search-results-items">
                                {!getSearchs && <NotFountSearch />}
                                {isLoading && <LoadingSearch />}
                                <div className="list-results-items">
                                    {getSearchs && getSearchs.map((e: any) =>
                                        <PostSearch
                                            key={e.id}
                                            title={e.title}
                                            author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                                            rate={e.ratings_avg_rating}
                                            price={e.price}
                                            slug={e.slug}
                                            thumbnail={e.full_path_thumbnail}
                                            buyers={e.count_buying}
                                            period={e.duration}
                                            username={e.profile_seller && e.profile_seller.profile&&e.profile_seller.profile.user.username}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>}
                        {/*
                        <ul className="popular-searchs-list nav">
                            <li className="popular-title">الأكثر بحثا: </li>
                            <li className="popular-item">
                                <Link href="dd">
                                    <a className="popular-link">تصميم المواقع</a>
                                </Link>
                            </li>
                            <li className="popular-item">
                                <Link href="dd">
                                    <a className="popular-link">ترمجة المقالات</a>
                                </Link>
                            </li>
                            <li className="popular-item">
                                <Link href="dd">
                                    <a className="popular-link">فوتوشوب</a>
                                </Link>
                            </li>
                            <li className="popular-item">
                                <Link href="dd">
                                    <a className="popular-link">غرافيك</a>
                                </Link>
                            </li>
                        </ul>*/}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hero

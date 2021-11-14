import React, { useState } from 'react'
//import HeroSearch from './HeroSearch'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import PostSearch from './Post/PostSearch';

const testServices = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet consectetur',
        author: 'Abdelhamid Boumegouas',
        rate: 4,
        price: 40,
        postUrl: '/Single',
        thumbnail: '/homepage.jpg',
        period: 9,
        buyers: 5,
        userUrl: '/user'
    },
    {
        id: 2,
        title: 'Voluptate aliquam temporibus necessitatibus sit accusamus',
        author: 'Tarek Aroui',
        rate: 5,
        price: 36,
        postUrl: '/Single',
        thumbnail: '/photographer.jpg',
        period: 5,
        buyers: 9,
        userUrl: '/user'
    },
    {
        id: 32,
        title: 'Voluptate aliquam temporibus necessitatibus sit accusamus',
        author: 'Tarek Aroui',
        rate: 5,
        price: 36,
        postUrl: '/Single',
        thumbnail: '/photographer.jpg',
        period: 5,
        buyers: 9,
        userUrl: '/user'
    },
]

function Hero() {
    const controlsParent = useAnimation();
    const controls = useAnimation();

    const [isSearch, setIsSearch] = useState(false)

    const onKeyUpHandle = (event) => {
        const keyword = event.target.value;
        if (keyword == '') {
            hiddenOnBlurSearch();
            setIsSearch(false)
        }else {
            animateOnSearch();
            setIsSearch(true)
        }
    }

    // Hide Image Hero on keyup keyword
    const animateOnSearch = () => {
        controlsParent.start({
            height: 0,
            opacity: 0,
            transition: { duration: 0.57, delay: 0.7 },
        })
        controls.start({
            y: -270,
            opacity: 0,
            transition: { duration: 0.61, delay: 0.6 },
        })
    }

    // Show Image Hero if empty keyword
    const hiddenOnBlurSearch = () => {
        controlsParent.start({
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.61, delay: 0.6 },
        })
        controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.57, delay: 0.7 },
        })
    }

    return (
        <div className="timlands-hero">
            <div className="timlands-hero-inner">
                <motion.div animate={controlsParent} style={{ overflow: 'hidden' }} className="timlands-hero-image">
                    <motion.img animate={controls} transition={{ duration: 0.53 }} src="/hero.png" alt="" />
                </motion.div>
                <div style={{ overflow: 'hidden' }} className="timlands-hero-content">
                    <motion.h1 transition={{ duration: 0.69 }} initial={{ y: -150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="main-title">
                    هذا النص هو مثال لنص يمكن أن يستبدل
                    </motion.h1>
                    <motion.h1 transition={{ duration: 0.69 }} initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sub-title">
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
                    </motion.h1>
                </div>
                <div className="timlands-hero-search">
                    <div className="rel-search">
                        <input type="text" onKeyUp={onKeyUpHandle} placeholder="البحث في تيموورك..." className="timlands-inputs" />
                        <button className="search-btn">
                            <span className="material-icons material-icons-outlined">search</span>
                        </button>
                        {isSearch && <motion.div initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.57, delay: 0.74 }} className="res-search-container">
                            <div className="search-results-items">
                                <div className="list-results-items">eded
                                    {testServices.map(e => 
                                        <PostSearch 
                                            key={e.id} 
                                            title={e.title} 
                                            author={e.author} 
                                            rate={e.rate}
                                            price={e.price}
                                            postUrl={e.postUrl}
                                            thumbnail={e.thumbnail}
                                            period={e.period}
                                            buyers={e.buyers}
                                            userUrl={e.userUrl}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>}

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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero

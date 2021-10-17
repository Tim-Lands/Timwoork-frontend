import React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
const categories = [
    {
        id: 1,
        cateUrl: '/category/id',
        name: 'Recording & Audio',
        icon: 'headphones',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 2,
        cateUrl: '/category/id',
        name: 'Programming & Tech',
        icon: 'code',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 3,
        cateUrl: '/category/id',
        name: 'Data',
        icon: 'account_tree',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 4,
        cateUrl: '/category/id',
        name: 'Video & Animation',
        icon: 'ondemand_video',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 5,
        cateUrl: '/category/id',
        name: 'Writing & Translation',
        icon: 'rate_review',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 6,
        cateUrl: '/category/id',
        name: 'Digital Marketing',
        icon: 'connected_tv',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 7,
        cateUrl: '/category/id',
        name: 'Graphics & Design',
        icon: 'view_in_ar',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 8,
        cateUrl: '/category/id',
        name: 'Business',
        icon: 'business',
        iconIsOutlined: true,
        count: 34,
    },
    {
        id: 9,
        cateUrl: '/category/id',
        name: 'Lifestyle',
        icon: 'volunteer_activism',
        iconIsOutlined: true,
        count: 34,
    },
]

function Explores() {
    const catVariants = {
        visible: i => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.092,
          },
        }),
        hidden: { opacity: 0, y: 9 },
      }
    return (
        <AnimatePresence>
            <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-explores">
                <div className="row">
                    <div className="col-md-4 p-0">
                        <div className="main-explores">
                            <ul className="main-explore-items">
                                {categories.map((e, i) => (
                                    <motion.li initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id} className="main-item-category">
                                        <Link href={e.cateUrl}>
                                            <a>
                                                <span className={"material-icons " + (e.iconIsOutlined ? 'material-icons-outlined' : '')}>{e.icon}</span>{e.name}
                                                <p className="count">{e.count}</p>
                                            </a>
                                        </Link>
                                    </motion.li>   
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 p-0">
                        <div className="main-explores-container">
                            <div className="main-item-category-header">
                                <h2 className="title"><span className="material-icons material-icons-outlined">connected_tv</span>  Digital Marketing</h2>
                            </div>
                            <div className="main-item-category-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Social Media Advertising</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Search Engine Optimization (SEO)</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Local SEO</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Marketing Strategy</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Public Relations</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Content Marketing</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Video Marketing</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Web Analytics</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Text Message Marketing</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Display Advertising</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Affiliate Marketing</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link href="/">
                                            <a className="sub-cat-link">
                                                <p className="text">Crowdfunding</p>
                                                <p className="count">19</p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Explores

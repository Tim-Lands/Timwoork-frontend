import React, { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import API from "../config";
import useSWR from 'swr'
import { Spin } from 'antd';

function Explores() {
    const [isLoading, setIsLoading] = useState(false)
    const [postsList, setPostsList]: any = useState([])
    const [isError, setIsError] = useState(false)

    const { data: categories, categoriesError }: any = useSWR('dashboard/categories', () =>
        API
            .get('dashboard/categories')
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status != 409) throw error
            }),
    )
    const getSubcats = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.get(`dashboard/categories/${id}`)
            if (res) {
                setIsLoading(false)
                setPostsList(res.data.data)
                console.log(res.data);

                setIsError(false)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }

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
    !categories && <div>يرجى الانتظار...</div>
    categoriesError && <div>'حدث خطأ'</div>
    return (
        <AnimatePresence>
            <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-explores">
                <div className="row">
                    <div className="col-md-4 p-0">
                        <div className="main-explores">
                            <ul className="main-explore-items">
                                {categories && categories.map((e, i) => (
                                    <motion.li initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id} className="main-item-category">
                                        <a onClick={() => getSubcats(e.id)}>
                                            <span className={"material-icons material-icons-outlined"}>{e.icon}</span>{e.name_ar}
                                            {/*<p className="count">{e.count}</p>*/}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 p-0">
                        {isError && 'حدث خطأ'}
                        <Spin spinning={isLoading}>
                            {postsList &&
                                <div className="main-explores-container">
                                    <div className="main-item-category-header">
                                        <h2 className="title"><span className="material-icons material-icons-outlined">{postsList.icon}</span>  {postsList.name_ar}</h2>
                                    </div>
                                    <div className="main-item-category-body">
                                        <div className="row">
                                            {postsList.subcategories && postsList.subcategories.map((e: any) => (
                                                <div className="col-sm-6" key={e.id}>
                                                    <a href="/category/category-slug" className="sub-cat-link">
                                                        <p className="text">{e.name_ar}</p>
                                                        <p className="count">19</p>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </Spin>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Explores

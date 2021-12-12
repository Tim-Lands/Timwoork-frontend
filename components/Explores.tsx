import React, { useState } from 'react'
import { motion } from 'framer-motion'
import API from "../config";
import useSWR from 'swr'
import { Spin } from 'antd';
import Loading from './Loading';

function Explores() {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [postsList, setPostsList]: any = useState([])

    const { data: categories, categoriesError }: any = useSWR('api/get_categories')

    const getSubcats = async (id: any) => {
        setIsLoading(true)
        try {
            const res: any = await API.get(`api/get_categories/${id}`)
            if (res) {
                setIsLoading(false)
                setPostsList(res.data.data)
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
    !categories && <Loading />
    !postsList && <Loading />
    categoriesError && <div>حدث خطأ</div>
    return (
        <div className="row">
            <div className="col-md-4 p-0">
                <div className="main-explores">
                    <ul className="main-explore-items">
                        {categories && categories.data.slice(0, 8).map((e: any, i) => (
                            <motion.li initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id} className="main-item-category">
                                <a onClick={() => getSubcats(e.id)}>
                                    <span className={"material-icons material-icons-outlined"}>{e.icon}</span>{e.name_ar}
                                    <p className="count">{e.products_count}</p>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-md-8 p-0">
                {isError && <div>حدث خطأ</div>}
                <Spin spinning={isLoading}>
                    {postsList &&
                        <div className="main-explores-container">
                            <div className="main-item-category-header">
                                <h2 className="title"><span className="material-icons material-icons-outlined">{postsList.icon}</span>  {postsList.name_ar}</h2>
                            </div>
                            <div className="main-item-category-body">
                                <div className="row">
                                    {postsList && postsList.slice(0, 12).map((e: any) => (
                                        (e.products_count !== 0) &&
                                        <div className="col-sm-6" key={e.id}>
                                            <a href={"/category/" + e.slug} className="sub-cat-link">
                                                <p className="text">{e.name_ar}</p>
                                                <p className="count">{e.products_count}</p>
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
    )
}

export default Explores

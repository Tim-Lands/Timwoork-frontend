import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Category from "@/components/NewIndex/Category";

interface Item {
    id: any,
    thumbnail: string,
    name: string,
    slug: string
}
function CategoriesSlider({ data, title, showAll, link }): ReactElement {
    return (
        <div className='timlands-horizontale-list'>
            <div className="timlands-horizontale-header">
                <h3 className="title">
                    {title}
                </h3>
                {showAll &&
                    <div className="aside-button">
                        <Link href={link}>
                            <a className='btn butt-sm butt-light'>
                                {showAll}
                            </a>

                        </Link>
                    </div>
                }
            </div>
            <div className="timlands-horizontale-body">
                <div className="row">
                    {data && data.map((item: Item) => (
                        <div className="col" key={item.id}>
                            <Category
                                thumbnail={item.thumbnail}
                                name={item.name}
                                slug={item.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

CategoriesSlider.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    showAll: PropTypes.string,
    link: PropTypes.string,
    isLoading: PropTypes.bool,
}

export default CategoriesSlider

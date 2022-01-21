import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import Loading from '../Loading'

function CategoriesFooter() {
    const { data: popularProducts }: any = useSWR('api/filter?paginate=5&popular')

    return (
        <div className="app-footer-aside">
        <div className="aside-header">
            <h4 className="title">الخدمات الأكثر شعبية</h4>
        </div>
        <div className="aside-body">
            {!popularProducts && <Loading />}
            <ul className="aside-list-items">
                {/*popularProducts && popularProducts.data.data.map((e: any) => (
                    <li key={e.id}>
                        <Link href={`/p/${e.slug}`}>
                            <a>{e.title}</a>
                        </Link>
                    </li>
                ))*/}
            </ul>
        </div>
    </div>
    )
}

export default CategoriesFooter

import Link from 'next/link'
import React from 'react'

function Subnavbar() {
    const categories = {
        data: [
            {
                id: 1,
                name_ar: 'التصميم الغرافيكي'
            },
            {
                id: 2,
                name_ar: 'التصميم الغرافيكي'
            },
            {
                id: 3,
                name_ar: 'التصميم الغرافيكي'
            },
            {
                id: 4,
                name_ar: 'التصميم الغرافيكي'
            },
            {
                id: 5,
                name_ar: 'التصميم الغرافيكي'
            },
        ]
    }
    //const { data: categories }: any = useSWR(`api/get_categories`);
    return (
        <nav className='new-subnavbar'>
            <div className="container">
                <ul className="subnavbar-nav nav">
                    {categories && categories.data.map((e: any) => (
                        <li key={e.id}>
                            <Link href={`/`}>
                                <a>
                                    {e.name_ar}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Subnavbar
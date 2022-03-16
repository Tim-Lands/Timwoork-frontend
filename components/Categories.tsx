import React from 'react'
import useSWR from 'swr'
const placeholders = [
    {
        id: 1,
        name_ar: ''
    },
    {
        id: 2,
        name_ar: ''
    },
    {
        id: 3,
        name_ar: ''
    },
    {
        id: 4,
        name_ar: ''
    },
    {
        id: 5,
        name_ar: ''
    },
    {
        id: 6,
        name_ar: ''
    },
    {
        id: 7,
        name_ar: ''
    },
    {
        id: 8,
        name_ar: ''
    },
    {
        id: 9,
        name_ar: ''
    },
    {
        id: 10,
        name_ar: ''
    },
    {
        id: 11,
        name_ar: ''
    },
    {
        id: 12,
        name_ar: ''
    },
]
function Categories() {
    const { data: categories }: any = useSWR(`api/get_categories`)
    return (
        <div className='container'>
            <div className="app-bill my-5" style={{ borderRadius: 7 }}>
                <div className="app-bill-content">
                    {!categories &&
                        <div className="row">
                            {placeholders && placeholders.map((e: any) => (
                                <div className="col-md-3 col-6" key={e.id}>
                                    <div className="placeholder-category-item">
                                        <div className="placeholder-category-item-icon">
                                            <span className={"material-icons material-icons-outlined"}>{e.icon}</span>
                                        </div>
                                        <div className="placeholder-category-item-title">
                                            <h3 className="title">{e.name_ar}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="row">
                        {categories && categories.data.map((e: any) => (
                            <div className="col-md-3 col-6" key={e.id}>
                                <div className="main-category-item">
                                    <div className="main-category-item-icon">
                                        <span className={"material-icons material-icons-outlined"}>{e.icon}</span>
                                    </div>
                                    <div className="main-category-item-title">
                                        <h3 className="title">{e.name_ar}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
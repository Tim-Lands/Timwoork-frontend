import React from 'react'
import useSWR from 'swr'

function Categories() {
    const { data: categories }: any = useSWR(`api/categories`)
    return (
        <div className='container'>
            <div className="app-bill my-5" style={{ borderRadius: 7 }}>
                <div className="app-bill-content">
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
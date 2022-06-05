import React, { useState } from 'react'
import { useRouter } from 'next/router'

function HeroSearchContent() {
    const [query, setQuery] = useState('')
    const router = useRouter();
    return (
        <div className='container-search-form'>
            <div className="container-search-form-input">
                <span className='input-icon-search'>
                    <span className="material-icons material-icons-outlined">search</span>
                </span>
                <input onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    router.push(`/products?query=${query}`)
                } onChange={e => setQuery(e.target.value)} type="text" placeholder='أكتب كلمة البحث مثلا: تصميم, ترجمة, تسويق إلكتروني, ...' />
                <button type='button' className='btn butt-md butt-primary2' onClick={() => router.push(`/products?query=${query}`)}>
                    بحث
                </button>
            </div>
        </div>
    )
}

export default HeroSearchContent
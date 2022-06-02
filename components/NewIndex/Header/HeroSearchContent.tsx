import React from 'react'
function HeroSearchContent() {
    return (
        <div className='container-search-form'>
            <div className="container-search-form-input">
                <span className='input-icon-search'>
                    <span className="material-icons material-icons-outlined">search</span>
                </span>
                <input type="text" placeholder='أكتب كلمة البحث مثلا: تصميم, ترجمة, تسويق إلكتروني, ...' />
                <button type='button' className='btn butt-md butt-primary2'>
                    بحث
                </button>
            </div>
        </div>
    )
}

export default HeroSearchContent
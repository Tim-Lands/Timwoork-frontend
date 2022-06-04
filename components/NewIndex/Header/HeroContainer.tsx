import React from 'react'
import HeroSearchContent from './HeroSearchContent'
function HeroContainer() {
    return (
        <div className='hero-container'>
            <div className="row">
                <div className="col-lg-9">
                    <h1 className='main-title'>اشتري. دردش .بيع</h1>
                    <h1 className='sub-title'>اكتشف سوق تيم ورك للخدمات الالكترونية الأكثر تطورا وراحة</h1>
                    <div className="hero-container-search">
                        <HeroSearchContent />
                        <ul className="popular-search">
                            <li className='pop-title'>
                                الأكثر بحثا: 
                            </li>
                            <li className='pop-item'>
                                <a href="">تصميم مواقع</a>
                            </li>
                            <li className='pop-item'>
                                <a href="">تصميم مواقع</a>
                            </li>
                            <li className='pop-item'>
                                <a href="">تصميم مواقع</a>
                            </li>
                            <li className='pop-item'>
                                <a href="">تصميم مواقع</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroContainer
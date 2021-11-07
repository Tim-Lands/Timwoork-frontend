import React, { useState } from 'react'
import Link from 'next/link'
import Explores from '../Explores'

function Menus() {
    const [showExplore, setShowExplore] = useState(false)
    const setShowExploreHandle = () => {
        setShowExplore(!showExplore)
    }
    return (
        <ul className="nav app-navbar">
            <li>
                <Link href="">
                    <a> 
                        <i className="material-icons material-icons-outlined">question_answer</i> المجتمع
                    </a>
                </Link>
            </li>
            <li>
                <Link href="">
                    <a>
                        <i className="material-icons material-icons-outlined">article</i> المدونة
                    </a>
                </Link>
            </li>
            <li className={showExplore && 'is-open'}>
                <a className="explore-butt" onClick={setShowExploreHandle}>
                    <i className="material-icons material-icons-outlined">chrome_reader_mode</i> التصنفات <i className="fa fa-angle-down"></i>
                </a>
                {showExplore && <Explores />}
            </li>
        </ul>
    )
}

export default Menus

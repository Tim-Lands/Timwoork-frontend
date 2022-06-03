import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Community from './Community'
import LoginForm from '@/components/NewIndex/LoginForm'
import { FaSearch } from 'react-icons/fa'
import Subnavbar from './Subnavbar'
function Navbar() {

    const [showCommunityMenu, setShowCommunityMenu] = useState(false)
    const [isShowLoginForm, setIsShowLoginForm] = useState(false)
    const [prevScrollpos, setrtPrevScrollpos] = useState((typeof window === "undefined") ?? window.pageYOffset)
    const [visible, setVisible] = useState(true)
    const handleScroll = () => {
        const currentScrollPos: any = (typeof window === "undefined") ?? window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
        setrtPrevScrollpos(currentScrollPos)
        setVisible(visible)
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll])
    return (
        <>
            {isShowLoginForm && <LoginForm setIsConfirmText={setIsShowLoginForm} />}
            <nav className={'app-new-navbar ' + (!visible ? ' is-fixed-nav' : '')}>
                <div className="app-new-logo d-flex">
                    {!visible ? <img src="/logo6.png" alt="" /> : <img src="/logo7.png" alt="" />}
                    {!visible &&
                        <div className="new-search-bar">
                            <div className="new-search-bar-form">
                                <span className="new-searchbar">
                                    <FaSearch />
                                </span>
                                <input type="text" placeholder='البحث في الموقع...' className='form-serach-nav' />
                                <button className='btn butt-xs butt-primary'>البحث</button>
                            </div>
                        </div>
                    }
                </div>
                <ul className="app-new-nav nav">
                    <li className='link-item'>
                        <Link href={'/test'}>
                            <a>
                                <span className="material-icons material-icons-outlined">shopping_cart</span> تصفح الخدمات
                            </a>
                        </Link>
                    </li>
                    <li className='link-item'>
                        <a onClick={() => setShowCommunityMenu(!showCommunityMenu)}>
                            <span className="material-icons material-icons-outlined">backup_table</span> مجتمع تيم وورك <span className="material-icons material-icons-outlined expand-more">expand_more</span>
                        </a>
                        {showCommunityMenu && <Community />}
                    </li>
                    <li>
                        <Link href={'/test'}>
                            <a className='btn butt-xs butt-primary2 flex-center'>
                                <span className="material-icons material-icons-outlined">person_add</span> التسجيل
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a className={`btn butt-xs flex-center ${!visible ? ' butt-primary2-out' : ' butt-white-out'}`} onClick={() => setIsShowLoginForm(true)}>
                            <span className="material-icons material-icons-outlined">person</span> تسجيل الدخول
                        </a>
                    </li>
                    <li className='circular-item'>
                        <Link href={'/test'}>
                            <a className='link-circular-button'>
                                <span className="material-icons material-icons-outlined">language</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
            {!visible && <Subnavbar />}
        </>
    )
}

export default Navbar
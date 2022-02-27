import React from 'react'
import Link from 'next/link'

function WebsiteLinksFooter() {
    return (
        <div className="app-footer-aside">
            <div className="aside-header">
                <h4 className="title">روابط الموقع</h4>
            </div>
            <div className="aside-body">
                <ul className="aside-list-items">
                    <li>
                        <Link href="/privacy">
                            <a>سياسة الخصوصية</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/terms">
                            <a>شروط الإستخدام</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about-us">
                            <a>حول الموقع</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contactus">
                            <a>اتصل بنا</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className="nav social-icons">
                <li>
                    <a href="https://twitter.com/timwoorkDotCom" rel="noreferrer" target="_blank" className="social-link bt-twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/timwoorkdotcom/" rel="noreferrer" target="_blank" className="social-link bt-instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/timwoorkDotCom" rel="noreferrer" target="_blank" className="social-link bt-facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default WebsiteLinksFooter

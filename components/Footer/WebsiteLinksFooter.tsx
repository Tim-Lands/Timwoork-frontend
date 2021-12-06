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
                        <Link href="/trust-company">
                            <a>شركات وثقت بنا</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/inite">
                            <a>دعوة الأصدقاء</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>كن بائع!</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className="nav social-icons">
                <li>
                    <a href="#" target="_blank" className="social-link">
                        <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" className="social-link">
                        <i className="fab fa-youtube"></i>
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" className="social-link">
                        <i className="fab fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" className="social-link">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default WebsiteLinksFooter

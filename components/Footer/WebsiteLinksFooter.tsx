import React from 'react'
import Link from 'next/link'

function WebsiteLinksFooter() {
    return (
        <div className="app-footer-aside">
            <div className="aside-header">
                <h4 className="title">Website</h4>
            </div>
            <div className="aside-body">
                <ul className="aside-list-items">
                    <li>
                        <Link href="">
                            <a>Privacy & Terms</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Help & Support</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Trust & Safety</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Invite a Friend</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Become a Seller</a>
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

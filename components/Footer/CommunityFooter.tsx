import React from 'react'
import Link from 'next/link'

function CommunityFooter() {
    return (
        <div className="app-footer-aside">
            <div className="aside-header">
                <h4 className="title">Community</h4>
            </div>
            <div className="aside-body">
                <ul className="aside-list-items">
                    <li>
                        <Link href="">
                            <a>Lorem ipsum dolor sit amet, consectetur adipiscing</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Excepteur sint occaecat cupidatat non proident, sunt</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Duis aute irure dolor in reprehenderit in</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Cillum dolore eu fugiat nulla pariatur. Excepteur</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a>Nstrud exercitation ullamco laboris nisi ut aliquip ex</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CommunityFooter

import React from 'react'
//import Link from 'next/link'
import BottomFooter from './BottomFooter'
import WebsiteLinksFooter from './WebsiteLinksFooter'
import BlogFooter from './BlogFooter'
import CommunityFooter from './CommunityFooter'
import CategoriesFooter from './CategoriesFooter'
function index() {
    return (
        <>
            <footer className="app-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <WebsiteLinksFooter />
                        </div>
                        <div className="col-lg-3">
                            <CategoriesFooter />
                        </div>
                        <div className="col-lg-3">
                            <BlogFooter />
                        </div>
                        <div className="col-lg-3">
                            <CommunityFooter />
                        </div>
                    </div>
                </div>
            </footer>
            <BottomFooter />
        </>
    )
}

export default index

import React from 'react'
//import Link from 'next/link'
import BottomFooter from './BottomFooter'
import WebsiteLinksFooter from './WebsiteLinksFooter'
import BlogFooter from './BlogFooter'
import CategoriesFooter from './CategoriesFooter'
function index() {
    return (
        <>
            <footer className="app-footer" style={{position: 'relative'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <WebsiteLinksFooter />
                        </div>
                        <div className="col-lg-4">
                            <CategoriesFooter />
                        </div>
                        <div className="col-lg-4">
                            <BlogFooter />
                        </div>
                    </div>
                </div>
            </footer>
            <BottomFooter />
        </>
    )
}

export default index

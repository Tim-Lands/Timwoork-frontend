import React from 'react'

function BottomFooter() {
    return (
        <div className="bottom-footer px-4 py-2">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1">
                <a href="/" className="d-flex payments-logo align-items-center col-md-3">
                    <img src="/payments.png" alt="" />
                </a>

                <ul className="nav center-nav-footer col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" className="nav-link px-2 link-dark">Home</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <p className="copy-text">© 2005-2011 <a href="#">TimWoork</a> All Rights Reserved</p>
                </div>
            </header>
        </div>
    )
}

export default BottomFooter

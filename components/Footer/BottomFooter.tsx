import Link from 'next/link'

function BottomFooter() {
    return (
        <div className="bottom-footer px-4 py-2">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1">
                <a href="/" className="d-flex payments-logo align-items-center col-md-3">
                    <img src="/payments.png" alt="" />
                </a>

                <ul className="nav center-nav-footer col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link href="/"><a className="nav-link px-2 link-dark">الرئيسية</a></Link></li>
                    <li><Link href="/faq"><a className="nav-link px-2 link-dark">الاسئلة الشائعة</a></Link></li>
                    <li><Link href="/about"><a className="nav-link px-2 link-dark">حول الموقع</a></Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    <p className="copy-text">© 2005-2011 <a href="/">TimWoork</a> جميع الحقوق محفوظة </p>
                </div>
            </header>
        </div>
    )
}

export default BottomFooter

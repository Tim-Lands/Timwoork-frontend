import Link from "next/link";

function BottomFooter() {
  return (
    <div className="bottom-footer px-4 py-2 d-flex align-items-center justify-content-center">
      <header
        style={{ maxWidth: 1300 }}
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1"
      >
        <span className="d-flex payments-logo align-items-center col-md-3">
          <img src="/payments.png" alt="" />
          <img
            style={{ height: 22, marginInline: 4 }}
            src="/Wise-logo.png"
            alt=""
          />
        </span>

        <ul className="nav center-nav-footer col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link href="/">
              <a className="nav-link px-2 link-dark">الرئيسية</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us">
              <a className="nav-link px-2 link-dark">حول الموقع</a>
            </Link>
          </li>
          <li>
            <Link href="/contactus">
              <a className="nav-link px-2 link-dark">اتصل بنا</a>
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <p className="copy-text">
            © 2021-2022 <a href="/">Timwoork</a> جميع الحقوق محفوظة{" "}
          </p>
        </div>
      </header>
    </div>
  );
}

export default BottomFooter;

import Layout from "../../components/Layout/HomeLayout";
import Link from "next/link";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function Redirect() {
  const url = useRouter();
  const [go, setGo] = useState("");
  const [back, setBack] = useState("");
  useEffect(() => {
    const links = url?.asPath?.split("=")[1]?.split("&*");
    if (links) {
      setGo(links[0]);
      setBack(links[1]);
    }
  });
  console.log(back);
  return (
    <div className="py-4">
      <MetaTags title="أعادة توجيه" />
      <div className="container my-3">
        <div className="redirect">
          <h4>انتبه جيدا. أنت على وشك الانتقال لموقع آخر خارج منصة تيم ورك</h4>
          <div className="warnings">
            <ul className="list">
              <li>
                لا تدخل معلومات حسابك في تيم ورك أو بريدك الالكتروني في أي صفحة
                خارجية
              </li>
              <li>
                تأكد دائماً من رابط الصفحة التي أنت عليها قبل تسجيل الدخول
                لحسابك في تيم ورك
              </li>
              <li>
                لا تتعامل مع أي مستخدم خارج الموقع أو تحول مبالغ له، تيم ورك
                يضمن حقوقك داخل الموقع فقط وليس خارجه
              </li>
            </ul>
            <div className="controllers">
              <button>
                <Link href={back ? "/" + back : "/redirect/f"}>رجوع</Link>
              </button>
              <button>
                <Link href={go ? go : "/redirect/f"}>
                  الانتقال للموقع الخارجي
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Redirect.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
Redirect.propTypes = {
  query: PropTypes.any,
};
export default Redirect;

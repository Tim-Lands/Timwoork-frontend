import Layout from "../../components/Layout/HomeLayout";
import Link from "next/link";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";
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
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLogin = getSectionLanguage("login");
  return (
    <div className="py-4">
      <MetaTags title="أعادة توجيه" />
      <div className="container my-3">
        <div className="redirect">
          <h4>{getLogin("Pay_close_attention")}</h4>
          <div className="warnings">
            <ul className="list">
              <li>{getLogin("Do_not_enter")}</li>
              <li>{getLogin("Always_check_the")}</li>
              <li>{getLogin("Do_not_deal")}</li>
            </ul>
            <div className="controllers">
              <button>
                <Link href={back ? "/" + back : "/redirect/f"}>
                  {getLogin("Return")}
                </Link>
              </button>
              <button>
                <Link href={go ? go : "/redirect/f"}>
                  {getLogin("Go_to_the")}
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

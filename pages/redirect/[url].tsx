import Layout from "../../components/Layout/HomeLayout";
import Link from "next/link";
import { ReactElement } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

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
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="py-4">
      <MetaTags title="أعادة توجيه" />
      <div className="container my-3">
        <div className="redirect">
          <h4>{getAll("Pay_close_attention")}</h4>
          <div className="warnings">
            <ul className="list">
              <li>{getAll("Do_not_enter")}</li>
              <li>{getAll("Always_check_the")}</li>
              <li>{getAll("Do_not_deal")}</li>
            </ul>
            <div className="controllers">
              <button>
                <Link href={back ? "/" + back : "/redirect/f"}>
                  {getAll("Return")}
                </Link>
              </button>
              <button>
                <Link href={go ? go : "/redirect/f"}>
                  {getAll("Go_to_the")}
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

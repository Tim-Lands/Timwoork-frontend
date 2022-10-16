import Link from "next/link";
import Head from "next/head";
import { useAppSelector } from "@/store/hooks";

function FourOFour() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="timwoork-404-page">
      <Head>
        <title> {getAll("An_interne_error")}</title>
      </Head>
      <div className="timwoork-404-page-inner">
        <div className="not-found-image">
          <img src="/undraw_Waiting__for_you_ldha.svg" alt="" />
        </div>
        <h1 className="title">
          <span className="error-status">500</span> |{" "}
          {getAll("An_interne_error")}
        </h1>
        <h2 className="text-xl text-purple-500 text-center underline flex hover:text-purple-700 transition">
          <Link href={"/"}>
            <a className="btn butt-primary butt-md">
              {getAll("Return_to_Home")}
            </a>
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default FourOFour;

import Link from "next/link";
// import Head from "next/head";
import { useAppSelector } from "@/store/hooks";

function FourOFour(props: any) {
  /**
   * Determine the link location that the link
   * on the page will lead to. If the user is
   * authenticated, it will be the user home route.
   * Otherwise it will be the homepage.
   */
  const linkLocation = props.isAuthenticated
    ? process.env.NEXT_PUBLIC_USER_HOME_ROUTE
    : "/";
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="timwoork-404-page">
      {/* <Head>
        <title>{getAll("Page_not_found")}</title>
      </Head> */}
      <div className="timwoork-404-page-inner">
        <div className="not-found-image">
          <img src="/undraw_Waiting__for_you_ldha.svg" alt="" />
        </div>
        <h1 className="title">
          <span className="error-status">404</span> |{getAll("Page_not_found")}
        </h1>
        <h2 className="text-xl text-purple-500 text-center underline flex hover:text-purple-700 transition">
          <Link href={linkLocation}>
            <a className="btn butt-primary butt-md">
              {getAll("Return_to_Home")}
            </a>
          </Link>
        </h2>
      </div>
    </div>
  );
}

// Map redux states to local component props.
export default FourOFour;
// const mapStateToProps = (state: any) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps)(FourOFour);

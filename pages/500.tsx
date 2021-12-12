/*
|--------------------------------------------------------------------------
| 404 Page.
|--------------------------------------------------------------------------
|
| The view that gets rendered when a user tries to visit a route that has
| no matching file in your /pages directory.
| If the user is authenticated, a link to the user home route (defined in your
| .env.local) will be displayed. Otherwise, a link to the homepage will be
| displayed.
|
*/
import Link from "next/link";
import Head from "next/head";

function FourOFour(props: any) {
    return (
        <div className="timwoork-404-page">
            <Head>
                <title>الصفحة غير موجودة</title>
            </Head>
            <div className="timwoork-404-page-inner">
                <div className="not-found-image">
                    <img src="/undraw_Waiting__for_you_ldha.svg" alt="" />
                </div>
                <h1 className="title"><span className="error-status">500</span> | حدث خطأ داخلي</h1>
                <h2 className="text-xl text-purple-500 text-center underline flex hover:text-purple-700 transition">
                    <Link href={'/'}>
                        <a className="btn butt-primary butt-md">الرجوع للرئيسية</a>
                    </Link>
                </h2>
            </div>
        </div>
    );
}

export default FourOFour

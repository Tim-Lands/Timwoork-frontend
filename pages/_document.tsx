import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {

    render() {

        return (
            <Html>
                <Head>
                    <title>تيموورك</title>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" />
                    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                    <meta name="description" content={'اشتري. دردش .بيع اكتشف سوق تيموورك للخدمات الالكترونية الأكثر تطورا وراحة'} />
                    <meta name="keywords" content={'خمسات, تيموورك, فايفر'} />

                    <meta name="theme-color" content="#444" />
                    <meta property="og:site_name" content={'اشتري. دردش .بيع اكتشف سوق تيموورك للخدمات'} />
                    <meta property="og:locale" content="ar" />
                    <meta property="og:locale:alternate" content="ar" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={'خمسات, تيموورك, فايفر'} />
                    <meta property="og:description" content={'اشتري. دردش .بيع اكتشف سوق تيموورك للخدمات الالكترونية الأكثر تطورا وراحة'}/>

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@KhamsatDotCom" />
                    <meta name="twitter:creator" content="@KhamsatDotCom" />
                    <meta name="twitter:title" content={'خمسات, تيموورك, فايفر'} />
                    <meta name="twitter:description" content={'اشتري. دردش .بيع اكتشف سوق تيموورك للخدمات الالكترونية الأكثر تطورا وراحة'} />
                    <link rel="icon" href="/icon.png" />
                </Head>
                <body>
                    <noscript dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PC97CFG"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
